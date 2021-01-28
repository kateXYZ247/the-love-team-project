package com.theloveteam.web.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.theloveteam.web.model.TokenSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static com.theloveteam.web.security.SecurityConstants.SECRET;
import static com.theloveteam.web.security.SecurityConstants.TOKEN_PREFIX;

public class JWTUtils {

    public static String parseSubjectFromToken(String token) throws JsonProcessingException {
        return JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                .build()
                .verify(token.replace(TOKEN_PREFIX, ""))
                .getSubject();
    }
}
