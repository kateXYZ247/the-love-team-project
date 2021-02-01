package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.CustomerOderHistoryList;
import com.theloveteam.web.dao.OrderHistory;
import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.CustomersOrderHistoryResponseBody;
import com.theloveteam.web.dto.OrderHistoryResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ServiceRepository;
import com.theloveteam.web.repositories.UserRepository;
import com.theloveteam.web.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GetCustomersOrderHistoryHandler extends AbstractRequestHandler<String, CustomersOrderHistoryResponseBody>{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderService orderService;

    @Override
    protected CustomersOrderHistoryResponseBody processRequest(String s) {
        List<User> users = userRepository.findAll();
        List<CustomerOderHistoryList> result = new ArrayList<>();
        for (User user : users) {
            CustomerOderHistoryList customerOderHistoryList = CustomerOderHistoryList.builder()
                    .orderHistoryList(orderService.gerOrderByUserId(user.getUserId()))
                    .user(user)
                    .build();
            result.add(customerOderHistoryList);
        }
        return new CustomersOrderHistoryResponseBody(result);
    }

    @Override
    protected void validatePermissionBeforeProcess(String userId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Role.admin.equals(tokenSubject.getRole())
                || !tokenSubject.getUserId().equals(userId)) {
            throw new RoleNotMatchException();
        }
    }
}
