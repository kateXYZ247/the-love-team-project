package com.theloveteam.web.dto;

import com.theloveteam.web.model.LogInType;
import com.theloveteam.web.model.Role;
import lombok.Getter;

@Getter
public class LoginRequestBody {
    //login with email ? account?
    private String email;
    private Role role;
    private LogInType loginType;
    private String password;
}
