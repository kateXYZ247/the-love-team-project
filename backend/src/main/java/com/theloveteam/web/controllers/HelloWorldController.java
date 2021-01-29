package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.HelloWorldRequestBody;
import com.theloveteam.web.dto.HelloWorldResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

  @GetMapping(UrlConstants.HELLO)
  public String getHelloWorld() {
    return "Hello, this is The Love Team.";
  }

  @PostMapping(UrlConstants.HELLO)
  public ResponseEntity<HelloWorldResponseBody> echoHelloWorld(@RequestBody HelloWorldRequestBody requestBody) {
    return ResponseEntity.ok().body(new HelloWorldResponseBody("Received from " + requestBody.getUsername() + ": " + requestBody.getMessage()));
  }

}
