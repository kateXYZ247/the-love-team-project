package com.theloveteam.web.controllers;

import com.theloveteam.web.dto.LoginRequestBody;
import com.theloveteam.web.dto.LoginResponseBody;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.model.LoginResult;
import com.theloveteam.web.repositories.UserRepository;
import com.theloveteam.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/users/login")
    public ResponseEntity<LoginResponseBody> login(
            @RequestBody LoginRequestBody requestBody) {
        LoginResult loginResult = userService.validateEmailAndPassword(requestBody.getEmail(), requestBody.getPassword());
        System.out.println(loginResult);
        return ResponseEntity.ok().body(new LoginResponseBody("Logged in.", loginResult));
    }

    // each time when there is a get register request, give back a requestBody object
    @GetMapping("/users/register")
    public String signUp(@ModelAttribute @RequestBody RegisterRequestBody registerRequestBody, Model model) {
        model.addAttribute("userDTO", registerRequestBody);
        return "register";
    }

    @PostMapping("/users/register")
    public String register(@Valid @RequestBody RegisterRequestBody registerRequestBody, BindingResult bindingResult,
                           RedirectAttributes redirect){
        System.out.println(registerRequestBody.toString());
        // check if the user exists
        if (userService.userExists(registerRequestBody.getEmail())) {
            bindingResult.addError(new FieldError("registerRequestBody",
                    "email", "Email address already in use"));
        }

        if (bindingResult.hasErrors()) {
            List<ObjectError> erorrs = bindingResult.getAllErrors();
            for (int i = 0; i < erorrs.toArray().length; i++) {
                System.out.println(erorrs.get(i).toString());
            }
            return "register";
        }

        //show success message
        redirect.addFlashAttribute("message", "Congrats! You've successfully completed your registration");
        userService.registerAccount(registerRequestBody);
        return "redirect:/users/login";
    }

}
