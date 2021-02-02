package com.theloveteam.web.services;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServService {
    @Autowired
    private ServiceRepository serviceRepository;

    public void createService(Serv serv) {
        serviceRepository.save(serv);
    }

}
