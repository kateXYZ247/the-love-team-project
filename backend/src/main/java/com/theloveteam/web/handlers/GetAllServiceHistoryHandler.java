package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetAllServiceHistoryHandler extends AbstractRequestHandler<String, ServsResponseBody >{
    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    protected void validatePermissionBeforeProcess(String providerId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Role.provider.equals(tokenSubject.getRole()) || !tokenSubject.getUserId().equals(providerId)) {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected ServsResponseBody processRequest(String providerId) {
        List<Serv> servList = serviceRepository.getServiceByProviderId(Long.parseLong(providerId));
        System.out.println(Long.parseLong(providerId));
        System.out.println(servList);
        return new ServsResponseBody(servList);
    }

}
