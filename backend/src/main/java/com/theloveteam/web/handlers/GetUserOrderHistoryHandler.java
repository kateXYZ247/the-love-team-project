package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.OrderHistory;
import com.theloveteam.web.dto.OrderHistoryResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetUserOrderHistoryHandler extends AbstractRequestHandler<String, OrderHistoryResponseBody>{

    @Autowired
    private OrderService orderService;

    @Override
    protected OrderHistoryResponseBody processRequest(String s) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        OrderHistoryResponseBody orderHistory = orderService.gerOrderByUserId(Long.parseLong(tokenSubject.getUserId()));
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
