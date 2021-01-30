package com.theloveteam.web.dto;

import com.theloveteam.web.dao.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderResponseBody {
    private List<Order> orderList;

}
