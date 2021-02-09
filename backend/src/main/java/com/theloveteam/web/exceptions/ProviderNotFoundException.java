package com.theloveteam.web.exceptions;

import lombok.AllArgsConstructor;
import me.alidg.errors.annotation.ExceptionMapping;
import me.alidg.errors.annotation.ExposeAsArg;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@AllArgsConstructor
@ExceptionMapping(statusCode = BAD_REQUEST, errorCode = "provider.not_found")
public class ProviderNotFoundException extends RuntimeException {
    @ExposeAsArg(0)
    private final String providerId;
}
