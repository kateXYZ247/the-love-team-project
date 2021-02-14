package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.dto.RegisterResponseBody;
import com.theloveteam.web.dto.UpdateAccountRequestBody;
import com.theloveteam.web.exceptions.UserAlreadyExistsException;
import com.theloveteam.web.handlers.GetUserDetailHandler;
import com.theloveteam.web.services.SendEmailService;
import com.theloveteam.web.services.TwilioService;
import com.theloveteam.web.handlers.UserAcctUpdateHandler;
import com.theloveteam.web.services.UserService;
import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private GetUserDetailHandler getUserDetailHandler;

    @Autowired
    private SendEmailService sendEmailService;

    @Autowired
    private TwilioService twilioService;
    private UserAcctUpdateHandler acctUpdateHandler;

    @GetMapping(UrlConstants.USERS_DETAILS)
    public ResponseEntity<User> getUserDetail(@PathVariable String userId) {
        return getUserDetailHandler.handle(userId);
    }

    @PostMapping(UrlConstants.USERS_REGISTER)
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestBody registerRequestBody, Errors errors) {
        System.out.println(registerRequestBody.toString());
        RegisterResponseBody responseBody = new RegisterResponseBody();
        // check if the user exists
        List<String> conflicts = userService.userExists(registerRequestBody.getEmail(), registerRequestBody.getPhone());
        if (!Collections.isEmpty(conflicts)) {
            throw new UserAlreadyExistsException(
                    conflicts.stream()
                            .reduce((first, second) -> String.format("%s and %s", first, second))
                            .orElse(""));
        }
        // check is there's any error from validation
        if (errors.hasFieldErrors()) {
            for (FieldError err : errors.getFieldErrors()) {
                responseBody.addErrorMsg(err.getDefaultMessage());
            }
            return ResponseEntity.badRequest()
                    .body(responseBody);
        }
        // if there isn't any error, save data and give success message
        userService.registerAccount(registerRequestBody);
        responseBody.setSuccessMessage("Congrats! You've successfully completed your registration.");
        try {
            sendEmailAndSmsAfterNewUser(registerRequestBody);
        } catch (Exception e) {
            System.out.println(e);
        }
        return ResponseEntity.ok(responseBody);
    }

    private void sendEmailAndSmsAfterNewUser(RegisterRequestBody registerRequestBody) {
        String body = "Dear " + registerRequestBody.getLastName() +
                ",\n\n Congrats! You've successfully completed your registration. \n\n" +
                "Welcome to The Love Team.";
        sendEmailService.sendEmail(registerRequestBody.getEmail(), body, "Welcome to The Love Team");
        twilioService.sendSms(registerRequestBody.getPhone(), body);
    }
    
    @PutMapping("/users/{id}/accounts")
    public ResponseEntity<?> accountUpdate(@PathVariable String id,
                                           @Valid @RequestBody UpdateAccountRequestBody accountRequestBody) {
        accountRequestBody.setUserId(id);
        return acctUpdateHandler.handle(accountRequestBody);
    }
}
