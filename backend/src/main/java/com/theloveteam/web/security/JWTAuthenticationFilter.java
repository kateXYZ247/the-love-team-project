package com.theloveteam.web.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.LoginRequestBody;
import com.theloveteam.web.utils.JsonUtils;
import lombok.SneakyThrows;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.auth0.jwt.JWT;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.theloveteam.web.constants.SecurityConstants.*;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(UrlConstants.LOGIN, HttpMethod.POST.name()));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            LoginRequestBody loginRequestBody = JsonUtils.convertJsonStringToObject(
                    req.getInputStream(), LoginRequestBody.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            // Put entire login request body as username, which can be used in SecurityService.
                            JsonUtils.convertObjectToJsonString(loginRequestBody),
                            loginRequestBody.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {
        String tokenSubjectJson = "";
        try {
            tokenSubjectJson = JsonUtils.convertObjectToJsonString(
                    ((LoginDetails) auth.getPrincipal()).getTokenSubject());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String token = JWT.create()
                .withSubject(tokenSubjectJson)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        res.getWriter().append( ((LoginDetails) auth.getPrincipal()).getTokenSubject().getUserId());
    }
}