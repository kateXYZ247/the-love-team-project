package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.HelloWorldRequestBody;
import com.theloveteam.web.dto.HelloWorldResponseBody;
import com.theloveteam.web.model.Greeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @Autowired
    private SimpMessagingTemplate template;

    @GetMapping(UrlConstants.HELLO)
    public String getHelloWorld() {
        this.template.convertAndSend("/topic/greetings", new Greeting("getHelloWorld API called"));
        return "Hello, this is The Love Team.";
    }

    @PostMapping(UrlConstants.HELLO)
    public ResponseEntity<HelloWorldResponseBody> echoHelloWorld(@RequestBody HelloWorldRequestBody requestBody) {
        return ResponseEntity.ok().body(new HelloWorldResponseBody("Received from " + requestBody.getUsername() + ": "
            + requestBody.getMessage()));
    }

}
