package com.theloveteam.web.exceptions;

import lombok.AllArgsConstructor;
import me.alidg.errors.annotation.ExceptionMapping;
import me.alidg.errors.annotation.ExposeAsArg;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@AllArgsConstructor
@ExceptionMapping(statusCode = BAD_REQUEST, errorCode = "user.not_found")
public class UserNotFoundException extends RuntimeException{
    @ExposeAsArg(0)
    private final String userId;
}
