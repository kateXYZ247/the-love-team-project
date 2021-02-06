package com.theloveteam.web.handlers;


import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.AllRequestedServsRequestBody;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.ServiceStatus;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetAllRequestedServicesHandler extends AbstractRequestHandler<String, ServsResponseBody>{
    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    protected void validatePermissionBeforeProcess(String providerId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) &&
                (tokenSubject.getUserId().equals(providerId))) {
            // provider role match & provider id match
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected ServsResponseBody processRequest(String providerId) {
        List<Serv> servList = serviceRepository.getAllServicesByStatus(ServiceStatus.requested.name());
        System.out.println(servList);
        return new ServsResponseBody(servList);
    }
}
