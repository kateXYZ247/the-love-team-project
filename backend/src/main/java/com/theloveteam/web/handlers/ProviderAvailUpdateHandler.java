package com.theloveteam.web.handlers;


import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dto.ProviderAvailRequestBody;
import com.theloveteam.web.dto.ProviderAvailResponseBody;
import com.theloveteam.web.exceptions.ProviderNotFoundException;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class ProviderAvailUpdateHandler extends AbstractRequestHandler<ProviderAvailRequestBody, ProviderAvailResponseBody> {

    @Autowired
    private ProviderService providerService;

    @Override
    protected void validatePermissionBeforeProcess(ProviderAvailRequestBody availRequestBody) {
        String providerId = availRequestBody.getProviderId();
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(providerId)) {
            // an user can only have permission to view when providerID matched
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected ProviderAvailResponseBody processRequest(ProviderAvailRequestBody availRequestBody) {
        String providerId = availRequestBody.getProviderId();
        ProviderAvailResponseBody availResponseBody = new ProviderAvailResponseBody();
        Optional<Provider> searchResult = providerService.getProviderByProviderId(Long.parseLong(providerId));
        if (searchResult != null) {
            providerService.updateAvail(availRequestBody.getIsAvailable(), searchResult);
            if (availRequestBody.getIsAvailable()) {
                availResponseBody.setSuccessMsg("You've successfully changed your status to available");
            } else {
                availResponseBody.setSuccessMsg("You've successfully changed your status to offline");
            }
            return availResponseBody;
        } else {
            throw new ProviderNotFoundException(providerId);
        }
    }
}
