package com.theloveteam.web.security;

import com.theloveteam.web.model.TokenSubject;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class LoginDetails extends User {

    @Getter
    private final TokenSubject tokenSubject;

    public LoginDetails(TokenSubject tokenSubject, String password, Collection<? extends GrantedAuthority> authorities) {
        super(tokenSubject.getUserId(), password, authorities);
        this.tokenSubject = tokenSubject;
    }
}
