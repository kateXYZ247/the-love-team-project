package com.theloveteam.web.services;

import ch.hsr.geohash.GeoHash;
import com.theloveteam.web.dao.Provider;

import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.dto.UpdateProviderLocationRequestBody;
import com.theloveteam.web.dto.UpdateProviderLocationResponseBody;
import com.theloveteam.web.external.GeoClient;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ProviderCategoriesRepository;
import com.theloveteam.web.repositories.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private ProviderCategoriesRepository providerCategoriesRepository;

    @Autowired
    private SimpUserRegistry userRegistry;

    @Autowired
    private GeoClient geoClient;

    public Optional<Provider> getProviderByProviderId(Long providerId) {
        return providerRepository.findProviderByID(providerId);
    }

    public List<ProviderCategories> getProductIdsByProviderId(Long providerId) {
        return providerCategoriesRepository.findByProviderId(providerId);
    }

    public List<Long> getProviderIdsByProductId(Long productId, List<Long> providerIdList) {
        return providerCategoriesRepository.findProviderIdsByProductIdFilteredByProviderIds(productId, providerIdList);
    }

    //update provider availability
    public void updateAvail(Boolean availability, Optional<Provider> searchResult) {
        Provider provider = searchResult.orElse(null);
        if (provider != null) {
            provider.setAvailable(availability);
            providerRepository.save(provider);
        }
    }

    public UpdateProviderLocationResponseBody getProviderLocation(Long providerId) {
        return getProviderByProviderId(providerId)
            .map(provider -> new UpdateProviderLocationResponseBody(provider.getLatitude(), provider.getLongitude()))
            .orElse(null);
    }

    public void updateLocation(Long providerId, Double latitude, Double longitude) {
        Provider provider = providerRepository.findProviderByID(providerId).orElse(null);
        if (provider != null) {
            provider.setLatitude(latitude);
            provider.setLongitude(longitude);
            provider.setGeohash(GeoHash.geoHashStringWithCharacterPrecision(latitude, longitude, 12));
            providerRepository.save(provider);
        }
    }

    public List<Long> getOnlineProviderIds() {
        return userRegistry.getUsers().stream().map(SimpUser::getPrincipal)
            .filter(Objects::nonNull)
            .map(p -> ((UsernamePasswordAuthenticationToken) p).getPrincipal())
            .map(p -> (TokenSubject) p)
            .map(TokenSubject::getUserId)
            .map(Long::valueOf)
            .collect(Collectors.toList());
    }
}
