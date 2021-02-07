package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.OrderRequest;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.HelloWorldRequestBody;
import com.theloveteam.web.dto.HelloWorldResponseBody;
import com.theloveteam.web.model.Greeting;
import com.theloveteam.web.model.TokenSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class HelloWorldController {
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private SimpUserRegistry userRegistry;

    @GetMapping(UrlConstants.HELLO)
    public String getHelloWorld() {
        this.template.convertAndSend(UrlConstants.WS_TOPIC + UrlConstants.WS_PROVIDERS,
            new Greeting("getHelloWorld API called, public"));
        this.template.convertAndSendToUser(
            "1", UrlConstants.WS_REPLY, new Greeting("getHelloWorld API called, private"));
        // System.out.println(userRegistry.getUsers());
        List<TokenSubject> test =
            userRegistry.getUsers().stream()
                .map(SimpUser::getPrincipal)
                .filter(Objects::nonNull)
                .map(p -> (TokenSubject) ((UsernamePasswordAuthenticationToken) p).getPrincipal())
                .collect(Collectors.toList());
        for (TokenSubject t : test) {
            System.out.println(t.getUserId() + ", " + t.getRole());
        }
        return "Hello, this is The Love Team.";
    }

    @PostMapping(UrlConstants.HELLO)
    public ResponseEntity<HelloWorldResponseBody> echoHelloWorld(@RequestBody HelloWorldRequestBody requestBody) {
        return ResponseEntity.ok().body(new HelloWorldResponseBody("Received from " + requestBody.getUsername() + ": "
            + requestBody.getMessage()));
    }

    @PostMapping(UrlConstants.FAKE_ORDER)
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest) {
        for (Serv serv : orderRequest.getServs()) {
            this.template.convertAndSendToUser("1", UrlConstants.WS_REPLY, serv);
        }
        return ResponseEntity.ok().body("Fake order placed");
    }

}
