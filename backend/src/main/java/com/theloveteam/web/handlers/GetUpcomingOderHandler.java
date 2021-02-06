package com.theloveteam.web.handlers;

import com.theloveteam.web.dto.OrderHistoryResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class GetUpcomingOderHandler extends AbstractRequestHandler<String, OrderHistoryResponseBody>{
    @Autowired
    private OrderService orderService;

    @Override
    protected OrderHistoryResponseBody processRequest(String s) {
        OrderHistoryResponseBody orderHistory = OrderHistoryResponseBody.builder()
                .orderHistoryResponseBody(orderService.getUpcomingOrderByUserId(Long.parseLong(s)))
                .build();
        return orderHistory;
    }

    @Override
    protected void validatePermissionBeforeProcess(String userId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Role.user.equals(tokenSubject.getRole())
                || !tokenSubject.getUserId().equals(userId)) {
            throw new RoleNotMatchException();
        }
    }

}
