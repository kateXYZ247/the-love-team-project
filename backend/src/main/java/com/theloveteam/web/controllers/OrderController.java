package com.theloveteam.web.controllers;

import com.theloveteam.web.dao.*;
import com.theloveteam.web.dto.OrderHistoryResponseBody;
import com.theloveteam.web.handlers.GetUserOrderHistoryHandler;
import com.theloveteam.web.handlers.PlaceOrderHandler;
import com.theloveteam.web.services.OrderService;
import com.theloveteam.web.services.ServService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    @Autowired
    private GetUserOrderHistoryHandler getUserOrderHistoryHandler;

    @Autowired
    private PlaceOrderHandler placeOrderHandler;

    @PostMapping("/orders")
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest) {

        return placeOrderHandler.handle(orderRequest);
    }

    @GetMapping("/orders/{userId}")
    public ResponseEntity<OrderHistoryResponseBody> gerOrderByUserId(@PathVariable String userId) {

        return getUserOrderHistoryHandler.handle(userId);
    }
}
