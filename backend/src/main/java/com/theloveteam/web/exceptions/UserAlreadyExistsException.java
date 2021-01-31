package com.theloveteam.web.exceptions;

import lombok.AllArgsConstructor;
import me.alidg.errors.annotation.ExceptionMapping;
import me.alidg.errors.annotation.ExposeAsArg;

import static org.springframework.http.HttpStatus.CONFLICT;

@AllArgsConstructor
@ExceptionMapping(statusCode = CONFLICT, errorCode = "user.already_exists")
public class UserAlreadyExistsException extends RuntimeException{
    @ExposeAsArg(0)
    private final String username;
}
