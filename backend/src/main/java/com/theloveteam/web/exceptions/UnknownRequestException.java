package com.theloveteam.web.exceptions;

import me.alidg.errors.annotation.ExceptionMapping;

import static org.springframework.http.HttpStatus.METHOD_NOT_ALLOWED;

@ExceptionMapping(statusCode = METHOD_NOT_ALLOWED, errorCode = "method.not_allowed")
public class UnknownRequestException extends RuntimeException {
}
