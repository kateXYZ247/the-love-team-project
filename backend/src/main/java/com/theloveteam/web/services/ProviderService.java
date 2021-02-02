package com.theloveteam.web.services;

import com.theloveteam.web.dao.Provider;

import com.theloveteam.web.repositories.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public Optional<Provider> getProviderByProviderId(Long providerId) {
        return providerRepository.findById(providerId);
    }

    //update provider availability
}
