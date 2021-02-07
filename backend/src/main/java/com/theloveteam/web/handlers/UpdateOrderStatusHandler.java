package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.UpdateOrderRequestBody;
import com.theloveteam.web.dto.UpdateOrderResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.ServiceStatus;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.OrderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class UpdateOrderStatusHandler extends AbstractRequestHandler <UpdateOrderRequestBody, UpdateOrderResponseBody>{
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ServiceRepository serviceRepository;

    @Override
    protected void validatePermissionBeforeProcess(UpdateOrderRequestBody updateOrderRequestBody) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            return;
        } else if (Role.user.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(updateOrderRequestBody.getUserId())) {
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }


    @Override
    protected UpdateOrderResponseBody processRequest(UpdateOrderRequestBody updateOrderRequestBody) {
        Long orderId = Long.parseLong(updateOrderRequestBody.getOrderId());
        String status = updateOrderRequestBody.getStatus();
        //TODO make this process transactional//
        List<Serv> servList = serviceRepository.getServiceByOrderId(orderId);
        List<Long> cancelableServiceIds = servList.stream()
                .filter(Objects::nonNull)
                .filter(serv -> ServiceStatus.accepted.name().equals(serv.getStatus())
                        || ServiceStatus.requested.name().equals(serv.getStatus()))
                .map(Serv::getServiceId)
                .collect(Collectors.toList());

        if (cancelableServiceIds.size() < servList.size()) {
            throw new UnknownRequestException();
        }
        //TODO make this process transactional//
        serviceRepository.updateServStatusByServIds(cancelableServiceIds, status);
        orderRepository.updateStatusByOrderId(orderId, status);
        return UpdateOrderResponseBody.builder().response("Order Cancel Success!").build();
    }
}
