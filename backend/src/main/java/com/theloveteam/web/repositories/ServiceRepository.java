package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.model.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Serv, Long> {
    @Query("select s from Serv s where s.orderId = ?1 order by s.createdAt desc")
    List<Serv> getServiceByOrderId(Long id);

    @Query("select s from Serv s where s.providerId = ?1 order by s.createdAt desc")
    List<Serv> getServiceByProviderId(Long id);

    @Query("select s from Serv s where s.providerId = ?1 and s.status in ('accepted', 'started') order by s.createdAt desc")
    List<Serv> getUpcomingServiceByProviderId(Long id);

    @Query("select s from Serv s where s.status = ?1")
    List<Serv> getAllServicesByStatus(String status);

    @Query("select s from Serv s where s.serviceId = ?1")
    Serv getServiceByServiceId(Long serviceId);

    //update status
    @Transactional
    @Modifying
    @Query("update Serv s set s.status = ?2 where s.serviceId = ?1 ")
    void updateServStatusByServId(Long serviceId, String status);

    //update providerId
    @Transactional
    @Modifying
    @Query("update Serv s set s.providerId = ?2, s.status = ?3 where s.serviceId = ?1")
    void updateServProviderIdAndServStatus(Long serviceId, Long providerId, String status);

    //update startedTime
    //update endedTime

}
