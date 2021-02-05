package com.theloveteam.web.handlers;


import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.AllRequestedServsRequestBody;
import com.theloveteam.web.dto.AllRequestedServsResponseBody;
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
public class GetAllRequestedServicesHandler extends AbstractRequestHandler<AllRequestedServsRequestBody, AllRequestedServsResponseBody>{
    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    protected void validatePermissionBeforeProcess(AllRequestedServsRequestBody allRequestedServsRequestBody) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) &&
                ((Long) Long.parseLong(tokenSubject.getUserId())).equals(allRequestedServsRequestBody.getProviderId())) {
            // provider role match & provider id match
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected AllRequestedServsResponseBody processRequest(AllRequestedServsRequestBody allRequestedServsRequestBody) {
        //CASE 1: if status == requested, return all services that match status
        if (allRequestedServsRequestBody.getStatus().equals(ServiceStatus.requested.name())) {
            List<Serv> servList = serviceRepository.getAllServicesByStatus(ServiceStatus.requested.name());
            System.out.println(servList);
            return new AllRequestedServsResponseBody(servList);
        } else {
            return new AllRequestedServsResponseBody(null);
        }

    }
}
