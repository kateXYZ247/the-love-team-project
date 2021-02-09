package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.*;
import com.theloveteam.web.dto.OrderHistoryResponseBody;
import com.theloveteam.web.dto.UpdateOrderRequestBody;
import com.theloveteam.web.dto.UpdateOrderResponseBody;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.handlers.*;
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

    @Autowired
    private UpdateOrderStatusHandler updateOrderStatusHandler;

    @PostMapping(UrlConstants.ORDERS)
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest) {

        return placeOrderHandler.handle(orderRequest);
    }

    @PatchMapping(UrlConstants.ORDERS_BY_ORDER_ID)
    public ResponseEntity<UpdateOrderResponseBody> updateOrder(@PathVariable String orderId,
                                                               @RequestBody UpdateOrderRequestBody updateOrderRequestBody) {
        updateOrderRequestBody.setOrderId(orderId);
        return updateOrderStatusHandler.handle(updateOrderRequestBody);
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
