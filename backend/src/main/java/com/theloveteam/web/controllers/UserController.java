package com.theloveteam.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.theloveteam.web.dto.LoginRequestBody;
import com.theloveteam.web.dto.LoginResponseBody;
import com.theloveteam.web.model.LoginResult;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.UserRepository;
import com.theloveteam.web.services.SecurityService;
import com.theloveteam.web.utils.JWTUtils;
import com.theloveteam.web.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private SecurityService securityService;
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    @PostMapping("/users/login")
//    public ResponseEntity<LoginResponseBody> login(
//            @RequestBody LoginRequestBody requestBody) {
////        LoginResult loginResult = securityService.validateEmailAndPassword(requestBody.getEmail(), requestBody.getPassword());
////        System.out.println(loginResult);
////        return ResponseEntity.ok().body(new LoginResponseBody("Logged in.", loginResult));
//        return  null;
//    }

    @GetMapping("/orders")
    public ResponseEntity<LoginResponseBody> pareTokenTest(@RequestHeader String authorization, @RequestBody LoginRequestBody requestBody) throws JsonProcessingException {
        TokenSubject tokenSubject = JsonUtils.convertJsonStringToObject(JWTUtils.parseSubjectFromToken(authorization), TokenSubject.class);
        return ResponseEntity.ok().body(new LoginResponseBody(tokenSubject.toString(), null));
    }
}
