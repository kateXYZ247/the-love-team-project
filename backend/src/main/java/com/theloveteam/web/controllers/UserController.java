package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.dto.RegisterResponseBody;
import com.theloveteam.web.exceptions.UserAlreadyExistsException;
import com.theloveteam.web.handlers.GetUserDetailHandler;
import com.theloveteam.web.services.UserService;
import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private GetUserDetailHandler getUserDetailHandler;

    @GetMapping(UrlConstants.USERS_DETAILS)
    public ResponseEntity<User> getUserDetail(@PathVariable String userId) {
        return getUserDetailHandler.handle(userId);
    }

    // each time when there is a get register request, give back a requestBody object
//    @GetMapping("/users/register")
//    public String signUp(@ModelAttribute @RequestBody RegisterRequestBody registerRequestBody, Model model) {
//        model.addAttribute("userDTO", registerRequestBody);F
//        return "register";
//    }

    @PostMapping(UrlConstants.USERS_REGISTER)
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestBody registerRequestBody, Errors errors){
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
        // if there isn't any error, save data and give sucess message
        userService.registerAccount(registerRequestBody);
        responseBody.setSuccessMessage("Congrats! You've successfully completed your registration.");
        return ResponseEntity.ok(responseBody);

    }

//    @PostMapping("/users/register")
//    public String register(@Valid @RequestBody RegisterRequestBody registerRequestBody, BindingResult bindingResult,
//                           RedirectAttributes redirect){
//        System.out.println(registerRequestBody.toString());
//        // check if the user exists
//        if (userService.userExists(registerRequestBody.getEmail())) {
//            bindingResult.addError(new FieldError("registerRequestBody",
//                    "email", "Email address already in use"));
//        }
//
//        if (bindingResult.hasErrors()) {
//            List<ObjectError> erorrs = bindingResult.getAllErrors();
//            for (int i = 0; i < erorrs.toArray().length; i++) {
//                System.out.println(erorrs.get(i).toString());
//            }
//            return "register";
//        }
//
//        //show success message
//        redirect.addFlashAttribute("message", "Congrats! You've successfully completed your registration");
//
//        return "redirect:/users/login";
//    }
}
