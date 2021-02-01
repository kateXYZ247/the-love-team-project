package com.theloveteam.web.dto;

import com.theloveteam.web.dao.CustomerOderHistoryList;
import com.theloveteam.web.dao.OrderHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomersOrderHistoryResponseBody {
    private List<CustomerOderHistoryList> customersOrderHistoryResponseBody;

}
