package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserNotFoundException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class GetProviderDetailHandler extends AbstractRequestHandler<String, Provider> {

    @Autowired
    private ProviderService providerService;

    @Override
    protected void validatePermissionBeforeProcess(String providerId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(providerId)) {
            // user only has permission to view when userId matched
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected Provider processRequest(String providerId) {
        return providerService.getProviderByProviderId(Long.parseLong(providerId)).orElse(null);
    }

    @Override
    protected void validatePermissionAndResponseAfterProcess(String providerId, Provider provider) {
        if (provider == null) {
            throw new UserNotFoundException(providerId);
        } else {
            //clean up un-public provider data
            provider.setPassword(null);
        }
    }
}
