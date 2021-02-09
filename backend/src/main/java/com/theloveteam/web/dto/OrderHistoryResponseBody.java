package com.theloveteam.web.dto;

import com.theloveteam.web.dao.OrderHistory;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderHistoryResponseBody {
    private List<OrderHistory> orderHistoryResponseBody;
}
