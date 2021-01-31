package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Order;
import com.theloveteam.web.dao.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    @Query("select s from Service s where s.orderId = ?1 order by s.createdAt")
    List<Service> gerServiceByOrderId(Long id);

}
