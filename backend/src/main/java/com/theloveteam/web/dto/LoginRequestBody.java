package com.theloveteam.web.dto;

import lombok.Getter;

@Getter
public class LoginRequestBody {
    //login with email ? account?
    private String email;
    private String password;
}
