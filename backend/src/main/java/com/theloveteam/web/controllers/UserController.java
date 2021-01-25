package com.theloveteam.web.controllers;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.LoginRequestBody;
import com.theloveteam.web.dto.LoginResponseBody;
import com.theloveteam.web.model.LoginResult;
import com.theloveteam.web.repositories.UserRepository;
import com.theloveteam.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/users/login")
    public ResponseEntity<LoginResponseBody> login(
            @RequestBody LoginRequestBody requestBody) {
        LoginResult loginResult = userService.validateEmailAndPassword(requestBody.getEmail(), requestBody.getPassword());
        System.out.println(loginResult);
        return ResponseEntity.ok().body(new LoginResponseBody("Logged in.", loginResult));
    }
}
