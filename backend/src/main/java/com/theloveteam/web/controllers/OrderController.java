package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.*;
import com.theloveteam.web.dto.OrderHistoryResponseBody;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.handlers.GetAllUpcomingServicesHandler;
import com.theloveteam.web.handlers.GetOrderHistoryHandler;
import com.theloveteam.web.handlers.GetUpcomingOderHandler;
import com.theloveteam.web.handlers.PlaceOrderHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class OrderController {

    @Autowired
    private GetOrderHistoryHandler getOrderHistoryHandler;

    @Autowired
    private PlaceOrderHandler placeOrderHandler;

    @Autowired
    private GetUpcomingOderHandler getUpcomingOderHandler;

    @PostMapping(UrlConstants.ORDERS)
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest) {

        return placeOrderHandler.handle(orderRequest);
    }


    @GetMapping(UrlConstants.ORDERS_BY_USER_ID)
    public ResponseEntity<OrderHistoryResponseBody> gerOrderByUserId(@RequestParam(name = "userId") String userId,
                                                                     @RequestParam(name = "status") Optional<String> statusOptional) {

        return statusOptional.map(status -> {
           if(status.equals("upcoming")) {
               return getUpcomingOderHandler.handle(userId);
           } else {
               throw new UnknownRequestException();
           }
        }).orElse(getOrderHistoryHandler.handle(userId));
//        if (!status.equals("upcoming")) {
//            return ResponseEntity.badRequest().body(null);
//        }
//        return getUpcomingOderHandler.handle(userId);
    }

//    @GetMapping(value = UrlConstants.ORDERS_BY_USER_ID, params = {"userId"})
//    public ResponseEntity<OrderHistoryResponseBody> gerOrderByUserId(@RequestParam String userId) {
//
//        return getOrderHistoryHandler.handle(userId);
//    }
}
