package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserNotFoundException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class GetUserDetailHandler extends AbstractRequestHandler<String, User> {

    @Autowired
    private UserService userService;

    @Override
    protected void validatePermissionBeforeProcess(String userId) {
        TokenSubject tokenSubject =
            (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.user.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(userId)) {
            // user only has permission to view when userId matched
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected User processRequest(String userId) {
        return userService.getUserByUserId(Long.parseLong(userId)).orElse(null);
    }

    @Override
    protected void validatePermissionAndResponseAfterProcess(String userId, User user) {
        if (user == null) {
            throw new UserNotFoundException(userId);
        } else {
            // Clean up un-public user data
            user.setPassword(null);
        }
    }
}
