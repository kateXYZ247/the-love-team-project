package com.theloveteam.web.dto;

import com.theloveteam.web.model.LogInType;
import com.theloveteam.web.model.Role;
import lombok.Getter;

/**
 * loginId can be anything including email, phone number or other unique id.
 * Use loginType to determine loginId's type.
 */
@Getter
public class LoginRequestBody {
    private String loginId;
    private LogInType loginType;
    private Role role;
    private String password;
}
