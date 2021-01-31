package com.theloveteam.web.controllers;

import com.theloveteam.web.dao.*;
import com.theloveteam.web.dto.OrderResponseBody;
import com.theloveteam.web.dto.ProductsResponseBody;
import com.theloveteam.web.repositories.OrderRepository;
import com.theloveteam.web.services.OrderService;
import com.theloveteam.web.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ServiceService serviceService;

    @PostMapping("/orders")
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest){
        Long userId = 1l;
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("requested");
        order.setCard(orderRequest.getCredit());
        long orderId = orderService.placeOrder(order);
        for (int i = 0; i < orderRequest.getServices().size(); i++) {
            Service service = Service.builder().orderId(orderId)
                                               .userId(userId)
                                               .startTime(orderRequest.getServices().get(i).getStartTime())
                                               .endTime(orderRequest.getServices().get(i).getEndTime())
                                               .productId(orderRequest.getServices().get(i).getProductId())
                                               .subprice(orderRequest.getServices().get(i).getSubprice())
                                               .address(orderRequest.getServices().get(i).getAddress())
                                               .status("requested")
                                               .apartment(orderRequest.getServices().get(i).getAddress())
                                               .pets(orderRequest.getServices().get(i).getPets())
                                               .direction(orderRequest.getServices().get(i).getDirection())
                                               .addressType(orderRequest.getServices().get(i).getAddressType())
                                               .build();
            serviceService.createService(service);
        }
        return ResponseEntity.ok().body("Order is Successfully Placed!");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderHistory>> gerOrderByUserId() {
//        TO be replaced by id from token
//        TokenSubject tokenSubject = JsonUtils.convertJsonStringToObject(JWTUtils.parseSubjectFromToken(authorization), TokenSubject.class);
        List<OrderHistory> orderHistory = orderService.gerOrderByUserId(1l);
        return ResponseEntity.ok().body(orderHistory);
    }
}
