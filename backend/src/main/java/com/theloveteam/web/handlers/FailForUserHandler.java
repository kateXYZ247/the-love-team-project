package com.theloveteam.web.handlers;

import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserAlreadyExistsException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class FailForUserHandler extends AbstractRequestHandler<String, String>{

    @Override
    public void validatePermissionBeforeProcess(String s) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.user.equals(tokenSubject.getRole()))
        throw new RoleNotMatchException();
    }

    @Override
    public String processRequest(String s) {
        return null;
    }
}
