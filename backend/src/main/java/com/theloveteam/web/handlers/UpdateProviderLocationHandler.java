package com.theloveteam.web.handlers;

import com.theloveteam.web.dto.UpdateProviderLocationRequestBody;
import com.theloveteam.web.dto.UpdateProviderLocationResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserNotFoundException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UpdateProviderLocationHandler extends AbstractRequestHandler<UpdateProviderLocationRequestBody,
    UpdateProviderLocationResponseBody> {

    @Autowired
    private ProviderService providerService;

    @Override
    protected void validatePermissionBeforeProcess(UpdateProviderLocationRequestBody updateProviderLocationRequestBody) {
        TokenSubject tokenSubject =
            (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(updateProviderLocationRequestBody.getProviderId())) {
            // user only has permission to view when userId matched
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected UpdateProviderLocationResponseBody processRequest(UpdateProviderLocationRequestBody updateProviderLocationRequestBody) {
        Long providerId = Long.parseLong(updateProviderLocationRequestBody.getProviderId());
        providerService.updateLocation(providerId, updateProviderLocationRequestBody.getLatitude(),
            updateProviderLocationRequestBody.getLongitude());
        return providerService.getProviderLocation(providerId);
    }

    @Override
    protected void validatePermissionAndResponseAfterProcess(
        UpdateProviderLocationRequestBody updateProviderLocationRequestBody,
        UpdateProviderLocationResponseBody updateProviderLocationResponseBody) {
        if (updateProviderLocationResponseBody == null) {
            throw new UserNotFoundException(updateProviderLocationRequestBody.getProviderId());
        }
    }
}
