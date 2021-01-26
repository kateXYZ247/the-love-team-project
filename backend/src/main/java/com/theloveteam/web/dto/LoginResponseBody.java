package com.theloveteam.web.dto;

import com.theloveteam.web.model.LoginResult;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseBody {
    //now is a fake token
    private String token;
    private LoginResult loginResult;
}
