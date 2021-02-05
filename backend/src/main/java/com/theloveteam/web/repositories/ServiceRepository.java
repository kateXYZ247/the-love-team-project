package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Serv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Serv, Long> {
    @Query("select s from Serv s where s.orderId = ?1 order by s.createdAt desc")
    List<Serv> getServiceByOrderId(Long id);

    @Query("select s from Serv s where s.providerId = ?1 order by s.createdAt desc")
    List<Serv> getServiceByProviderId(Long id);

    @Query("select s from Serv s where s.providerId = ?1 and s.status in ('accepted', 'started') order by s.createdAt desc")
    List<Serv> getUpcomingServiceByProviderId(Long id);
}
