package com.theloveteam.web.exceptions;

import me.alidg.errors.annotation.ExceptionMapping;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ExceptionMapping(statusCode = BAD_REQUEST, errorCode = "service.not_found")
public class ServiceNotFoundException extends RuntimeException{
}
