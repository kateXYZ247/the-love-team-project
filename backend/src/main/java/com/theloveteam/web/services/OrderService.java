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
        List<Order> orders = orderRepository.gerAllOrderByUserId(id);
        List<OrderHistory> orderHistoryList = new ArrayList<>();

        for (int i = 0; i < orders.size(); i++) {
            List<Serv> servs = serviceRepository.getServiceByOrderId(orders.get(i).getOrderId());
            String status = "requested";
            int requested = 0, accepted = 0;
            for (Serv serv : servs) {
                if (serv.getStatus().equals("requested")) {
                    requested++;
                } else if (serv.getStatus().equals("accepted") || serv.getStatus().equals("started") || serv.getStatus().equals("ended")) {
                    accepted++;
                }
            }
            if (requested == 0 && accepted == 0) {
                status = "finished";
            } else if (requested == 0 && accepted != 0) {
                status = "accepted";
            }

            OrderHistory orderHistory = OrderHistory.builder()
                .orderId(orders.get(i).getOrderId())
                .userId(orders.get(i).getUserId())
                .createdAt(orders.get(i).getCreatedAt())
                .totalPrice(orders.get(i).getTotalPrice())
                .status(status)
                .servs(servs)
                .build();
            orderHistoryList.add(orderHistory);
        }
        return orderHistoryList;
    }

    public List<OrderHistory> getUpcomingOrderByUserId(Long id) {
        List<OrderHistory> upcomingOrders = new ArrayList<>();
        List<OrderHistory> orderHistories= getOrderByUserId(id);
        for (OrderHistory orderHistory : orderHistories) {
            if (orderHistory.getStatus() != "finished") {
                upcomingOrders.add(orderHistory);
            }
        }
        return upcomingOrders;
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteOrderById(id);
    }

    public long placeOrder(Order order) {
        Order insertedOrder = orderRepository.save(order);
        return insertedOrder.getOrderId();
    }

}
