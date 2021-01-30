package com.theloveteam.web.services;

import com.theloveteam.web.dao.Order;
import com.theloveteam.web.repositories.OrderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    public void createService(com.theloveteam.web.dao.Service service) {
        serviceRepository.save(service);
    }

}
