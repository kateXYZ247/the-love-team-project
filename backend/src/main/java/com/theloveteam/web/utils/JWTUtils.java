package com.theloveteam.web.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;

import static com.theloveteam.web.constants.SecurityConstants.SECRET;
import static com.theloveteam.web.constants.SecurityConstants.TOKEN_PREFIX;

public class JWTUtils {

    public static String parseSubjectFromToken(String token) {
        return JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                .build()
                .verify(token.replace(TOKEN_PREFIX, ""))
                .getSubject();
    }
}
