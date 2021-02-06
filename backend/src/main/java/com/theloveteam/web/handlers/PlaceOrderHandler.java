package com.theloveteam.web.handlers;

import ch.hsr.geohash.GeoHash;
import com.theloveteam.web.dao.Order;
import com.theloveteam.web.dao.OrderRequest;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.OrderService;
import com.theloveteam.web.services.ServService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class PlaceOrderHandler extends AbstractRequestHandler<OrderRequest, String>{
    @Autowired
    private ServService servService;

    @Autowired
    private OrderService orderService;

    @Override
    protected String processRequest(OrderRequest orderRequest) {
        Long userId = orderRequest.getUserId();
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("requested");
        order.setCard(orderRequest.getCredit());
        order.setTotalPrice(orderRequest.getTotalPrice());
        long orderId = orderService.placeOrder(order);
        for (int i = 0; i < orderRequest.getServs().size(); i++) {
            Serv serv = Serv.builder().orderId(orderId)
                    .userId(userId)
                    .startTime(orderRequest.getServs().get(i).getStartTime())
                    .endTime(orderRequest.getServs().get(i).getEndTime())
                    .productId(orderRequest.getServs().get(i).getProductId())
                    .productName(orderRequest.getServs().get(i).getProductName())
                    .productPrice(orderRequest.getServs().get(i).getProductPrice())
                    .address(orderRequest.getServs().get(i).getAddress())
                    .status("requested")
                    .apartment(orderRequest.getServs().get(i).getAddress())
                    .pets(orderRequest.getServs().get(i).getPets())
                    .direction(orderRequest.getServs().get(i).getDirection())
                    .addressType(orderRequest.getServs().get(i).getAddressType())
                    .build();
            servService.createService(serv);
        }

        return "Order is Successfully Placed!";
    }

    @Override
    protected void validatePermissionBeforeProcess(OrderRequest orderRequest) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Role.user.equals(tokenSubject.getRole())
                || !tokenSubject.getUserId().equals(orderRequest.getUserId().toString())) {
            throw new RoleNotMatchException();
        }
    }
}
