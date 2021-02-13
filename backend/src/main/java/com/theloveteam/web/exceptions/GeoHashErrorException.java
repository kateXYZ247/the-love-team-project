package com.theloveteam.web.exceptions;

import lombok.AllArgsConstructor;
import me.alidg.errors.annotation.ExceptionMapping;

import static org.springframework.http.HttpStatus.REQUEST_TIMEOUT;

@AllArgsConstructor
@ExceptionMapping(statusCode = REQUEST_TIMEOUT, errorCode = "geo_client.request_timeout")
public class GeoHashErrorException extends RuntimeException{
    public GeoHashErrorException (Throwable cause) {
        super(cause);
    }
}
