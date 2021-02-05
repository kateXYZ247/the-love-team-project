package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.UpdateServRequestBody;
import com.theloveteam.web.dto.UpdateServResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.ServiceAlreadyAccepted;
import com.theloveteam.web.exceptions.ServiceNotFoundException;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.ServiceStatus;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UpdateServStatusHandler extends AbstractRequestHandler <UpdateServRequestBody, UpdateServResponseBody> {

    @Autowired
    ServiceRepository serviceRepository;

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
            return UpdateServResponseBody.builder().response("Update Success!").build();
            //move to after?2.after set to accepted -> check same orderId services, if all accepted -> update order status
        } else if (status.equals(ServiceStatus.accepted.name()) && !currentStatus.equals(ServiceStatus.requested.name())) {
            throw new ServiceAlreadyAccepted();
        } else if (status.equals(ServiceStatus.canceled.name())) {
            //CASE 2: canceled -> update providerId & status
            serviceRepository.updateServProviderIdAndServStatus(serviceId, null, ServiceStatus.requested.name());
            return UpdateServResponseBody.builder().response("Update Success!").build();
        } else if ((status.equals(ServiceStatus.started.name()) && currentStatus.equals(ServiceStatus.accepted.name()))
                || (status.equals(ServiceStatus.ended.name()) && currentStatus.equals(ServiceStatus.started.name()))) {
            //CASE 3: started/ended -> only update status
            serviceRepository.updateServStatusByServId(serviceId, status);
            return UpdateServResponseBody.builder().response("Update Success!").build();
        } else {
            throw new UnknownRequestException();
        }
        //update time stamp in future

        //User Service Interaction
    }
}
