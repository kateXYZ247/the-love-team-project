package com.theloveteam.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.LoginRequestBody;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.utils.JWTUtils;
import com.theloveteam.web.utils.JsonUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    //this is for testing security API//
//    @GetMapping(UrlConstants.ORDERS)
//    public ResponseEntity<String> pareTokenTest(@RequestHeader String authorization, @RequestBody LoginRequestBody requestBody) throws JsonProcessingException {
//        TokenSubject tokenSubject = JsonUtils.convertJsonStringToObject(JWTUtils.parseSubjectFromToken(authorization), TokenSubject.class);
//        return ResponseEntity.ok().body(tokenSubject.toString());
//    }
    //end//
}
