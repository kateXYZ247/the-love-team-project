package com.theloveteam.web.services;

import com.theloveteam.web.dao.Product;
import com.theloveteam.web.dao.Provider;

import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.repositories.ProductRepository;
import com.theloveteam.web.repositories.ProviderCategoriesRepository;
import com.theloveteam.web.repositories.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ProviderCategoriesRepository providerCategoriesRepository;

    public Optional<Provider> getProviderByProviderId(Long providerId) {
        return providerRepository.findById(providerId);
    }

    public List<ProviderCategories> getProductIdsByProviderId(Long providerId) {
        return providerCategoriesRepository.findByProviderId(providerId);
    }

    //update provider availability
}
