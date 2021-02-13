package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.*;
import com.theloveteam.web.dto.UpdateServRequestBody;
import com.theloveteam.web.dto.UpdateServResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.ServiceAlreadyAccepted;
import com.theloveteam.web.exceptions.ServiceNotFoundException;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.ServiceStatus;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ProductRepository;
import com.theloveteam.web.repositories.ProviderRepository;
import com.theloveteam.web.repositories.OrderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import com.theloveteam.web.services.SendEmailService;
import com.theloveteam.web.services.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class UpdateServStatusHandler extends AbstractRequestHandler<UpdateServRequestBody, UpdateServResponseBody> {

    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProviderRepository providerRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private SendEmailService sendEmailService;

    @Autowired
    private TwilioService twilioService;

    @Override
    protected void validatePermissionBeforeProcess(UpdateServRequestBody updateServRequestBody) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(updateServRequestBody.getProviderId())) {
            // only match providerId can update services detail
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected UpdateServResponseBody processRequest(UpdateServRequestBody updateServRequestBody) {
        Long serviceId = Long.parseLong(updateServRequestBody.getServiceId());
        Long providerId = Long.parseLong(updateServRequestBody.getProviderId());
        String status = updateServRequestBody.getStatus();
        Serv service = serviceRepository.getServiceByServiceId(serviceId);
        if (service == null) {
            throw new ServiceNotFoundException();
        }
        String currentStatus = service.getStatus();
        //CASE 1: accepted-> update providerId & status
        //check status requested? accepted : err
        if (status.equals(ServiceStatus.accepted.name()) && currentStatus.equals(ServiceStatus.requested.name())) {
            serviceRepository.updateServProviderIdAndServStatus(serviceId, providerId, status);
            sendEmailAndSmsAfterUpdateServiceStatus(updateServRequestBody, service);
            return UpdateServResponseBody.builder().response("Update Success!").build();
            //move to after?2.after set to accepted -> check same orderId services, if all accepted -> update order status
        } else if (status.equals(ServiceStatus.accepted.name()) && !currentStatus.equals(ServiceStatus.requested.name())) {
            throw new ServiceAlreadyAccepted();
        } else if (status.equals(ServiceStatus.canceled.name())) {
            //CASE 2: canceled -> update providerId & status
            serviceRepository.updateServProviderIdAndServStatus(serviceId, null, ServiceStatus.requested.name());
            sendEmailAndSmsAfterUpdateServiceStatus(updateServRequestBody, service);
            return UpdateServResponseBody.builder().response("Update Success!").build();
        } else if ((status.equals(ServiceStatus.started.name()) && currentStatus.equals(ServiceStatus.accepted.name()))
                || (status.equals(ServiceStatus.ended.name()) && currentStatus.equals(ServiceStatus.started.name()))) {
            //CASE 3: started/ended-> only update status
            serviceRepository.updateServStatusByServId(serviceId, status);
            try {
                sendEmailAndSmsAfterUpdateServiceStatus(updateServRequestBody, service);
            } catch (Exception e) {
                //  TODO
                System.out.println(e);
            }

            return UpdateServResponseBody.builder().response("Update Success!").build();
        } else {
            throw new UnknownRequestException();
        }
        //update time stamp in future

        //User Service Interaction
    }

    private void sendEmailAndSmsAfterUpdateServiceStatus(UpdateServRequestBody updateServRequestBody, Serv service) {
        StringBuilder sb = new StringBuilder();
        Product product = productRepository.findByProductId(service.getProductId());
        Provider provider = providerRepository.findProviderById(Long.parseLong(updateServRequestBody.getProviderId()));
        SimpleDateFormat formatter = new SimpleDateFormat("yyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat printFormatter = new SimpleDateFormat("MM/dd/yyyy HH:mm");
        try {
            Date startTime = formatter.parse(service.getStartTime());
            Date endTime = formatter.parse(service.getEndTime());
            sb.append("You " + updateServRequestBody.getStatus() + " a service: \n\n\n");
            sb.append(product.getProductName() + "\n");
            sb.append("\n\nAppointment Time: " + printFormatter.format(startTime));
            sb.append("\n\nEnd Time: " + printFormatter.format(endTime));
            sb.append("\n\nAddress: " + service.getAddress());
            sb.append("\n\n\nHave a good one! \n\n\n\n -The Love Team");
            String body = sb.toString();
            sendEmailService.sendEmail(provider.getEmail(), body, "The Love Team: " + updateServRequestBody.getStatus() + " a Service");
            twilioService.sendSms(provider.getPhone(), body);
        } catch (ParseException e) {
            e.printStackTrace();
        };
    }

    @Override
    protected void validatePermissionAndResponseAfterProcess(UpdateServRequestBody updateServRequestBody,
                                                             UpdateServResponseBody updateServResponseBody) {
        Long serviceId = Long.parseLong(updateServRequestBody.getServiceId());
        Serv service = serviceRepository.getServiceByServiceId(serviceId);
        Long orderId = service.getOrderId();
        String status = updateServRequestBody.getStatus();
        List<Serv> servList = serviceRepository.getServiceByOrderId(orderId);
        //Update order status, if all services ended
        if (status.equals(ServiceStatus.ended.name())) {
            //check other service in same order
            List<Long> endedServiceIds = servList.stream()
                    .filter(Objects::nonNull)
                    .filter(serv -> ServiceStatus.ended.name().equals(serv.getStatus()))
                    .map(Serv::getServiceId)
                    .collect(Collectors.toList());
            if (endedServiceIds.size() == servList.size()) {
                orderRepository.updateStatusByOrderId(orderId, ServiceStatus.finished.name());
            }
        }
        //Update order status, if all services accepted
        if (status.equals(ServiceStatus.accepted.name())) {
            //check other service in same order
            List<Long> endedServiceIds = servList.stream()
                    .filter(Objects::nonNull)
                    .filter(serv -> ServiceStatus.accepted.name().equals(serv.getStatus()))
                    .map(Serv::getServiceId)
                    .collect(Collectors.toList());
            if (endedServiceIds.size() == servList.size()) {
                orderRepository.updateStatusByOrderId(orderId, ServiceStatus.accepted.name());
            }
        }
    }
}
