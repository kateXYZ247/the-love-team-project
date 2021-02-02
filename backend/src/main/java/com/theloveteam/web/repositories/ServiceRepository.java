package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Serv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Serv, Long> {
    @Query("select s from Serv s where s.orderId = ?1 order by s.createdAt")
    List<Serv> gerServiceByOrderId(Long id);

}
