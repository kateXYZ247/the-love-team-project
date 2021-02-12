package com.theloveteam.web.services;

import com.theloveteam.web.constants.ServConstants;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ServService {
    @Autowired
    private ServiceRepository serviceRepository;

    private Random rand = new Random();

    public void createService(Serv serv) {
        serviceRepository.save(serv);
    }

    public Serv removeAddressInfo(Serv serv) {
        serv.setAddress(null);
        serv.setAddressType(null);
        serv.setGeohash(null);
        serv.setApartment(null);
        serv.setDirection(null);
        serv.setLatitude(serv.getLatitude() + (rand.nextDouble() - 0.5) * ServConstants.GEO_LOCATION_OFFSET_AMPLITUDE);
        serv.setLongitude(serv.getLongitude() + (rand.nextDouble() - 0.5) * ServConstants.GEO_LOCATION_OFFSET_AMPLITUDE);
        return serv;
    }
}
