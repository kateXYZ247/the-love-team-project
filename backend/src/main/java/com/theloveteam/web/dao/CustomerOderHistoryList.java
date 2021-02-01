package com.theloveteam.web.dao;

import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerOderHistoryList {
    private User user;
    private List<OrderHistory> orderHistoryList;
}
