package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.UpdateAccountRequestBody;
import com.theloveteam.web.dto.UpdateAccountResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserAlreadyExistsException;
import com.theloveteam.web.exceptions.UserNotFoundException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import javax.validation.Valid;
import java.util.Optional;

@Component
public class UserAcctUpdateHandler extends AbstractRequestHandler<UpdateAccountRequestBody, UpdateAccountResponseBody> {

    @Autowired
    UserService userService;

    @Override
    protected void validatePermissionBeforeProcess(UpdateAccountRequestBody accountRequestBody) {
        String userId = accountRequestBody.getUserId();
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

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
    protected UpdateAccountResponseBody processRequest(@Valid UpdateAccountRequestBody accountRequestBody) {
        UpdateAccountResponseBody accountResponseBody = new UpdateAccountResponseBody();
        String userId = accountRequestBody.getUserId();
        Optional<User> searchResult = userService.getUserByUserId(Long.parseLong(userId));
        if (searchResult != null) {
            userService.updateProfile(accountRequestBody, searchResult);
            accountResponseBody.setSuccessMsg("You've successfully updated your profile!");
            return accountResponseBody;
        } else {
            throw new UserNotFoundException(userId);
        }
    }
}
