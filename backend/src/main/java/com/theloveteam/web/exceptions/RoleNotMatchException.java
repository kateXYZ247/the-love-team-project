package com.theloveteam.web.exceptions;

import me.alidg.errors.annotation.ExceptionMapping;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@ExceptionMapping(statusCode = UNAUTHORIZED, errorCode = "security.role_not_match")
public class RoleNotMatchException extends RuntimeException{
}
