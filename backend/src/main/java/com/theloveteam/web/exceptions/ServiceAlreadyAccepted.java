package com.theloveteam.web.exceptions;

import me.alidg.errors.annotation.ExceptionMapping;
import static org.springframework.http.HttpStatus.CONFLICT;

@ExceptionMapping(statusCode = CONFLICT, errorCode = "service.already_accepted")
public class ServiceAlreadyAccepted extends RuntimeException{
}
