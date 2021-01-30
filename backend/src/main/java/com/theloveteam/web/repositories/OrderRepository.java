package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Order;
import com.theloveteam.web.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from Order o where o.userId = ?1 order by o.createdAt")
    List<Order> gerOrderByUserId(Long id);

    @Transactional
    @Modifying
    @Query("delete from Order o where o.orderId = ?1")
    void deleteOrderById(Long id);

    @Transactional
    @Modifying
    @Query("update Order o set o.status = :status where o.orderId = :id")
    void updateStatusByOrderId(Long id, String status);
}
