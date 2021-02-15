package com.theloveteam.web.services;

import com.theloveteam.web.dao.Order;
import com.theloveteam.web.dao.OrderHistory;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.repositories.OrderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public List<OrderHistory> getOrderByUserId(Long id) {
        return getServicesForOrders(orderRepository.gerAllOrderByUserId(id));
    }

    public List<OrderHistory> getUpcomingOrderByUserId(Long id) {
        return getServicesForOrders(orderRepository.getUpcomingOrderByUserId(id));
    }

    private List<OrderHistory> getServicesForOrders(List<Order> orders) {
        List<OrderHistory> orderHistoryList = new ArrayList<>();

        for (Order order : orders) {
            List<Serv> servs = serviceRepository.getServiceByOrderId(order.getOrderId());
            OrderHistory orderHistory = OrderHistory.builder()
                .orderId(order.getOrderId())
                .userId(order.getUserId())
                .createdAt(order.getCreatedAt())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .servs(servs)
                .build();
            orderHistoryList.add(orderHistory);
        }
        return orderHistoryList;
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteOrderById(id);
    }

    public long placeOrder(Order order) {
        Order insertedOrder = orderRepository.save(order);
        return insertedOrder.getOrderId();
    }

}
