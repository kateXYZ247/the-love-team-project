package com.theloveteam.web.handlers;


import ch.hsr.geohash.GeoHash;
import com.theloveteam.web.dao.GeoData;
import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.AllRequestedServsRequestBody;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.exceptions.GeoHashErrorException;
import com.theloveteam.web.exceptions.ProviderNotFoundException;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.external.GeoClient;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.ServiceStatus;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ProviderCategoriesRepository;
import com.theloveteam.web.repositories.ProviderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import com.theloveteam.web.services.ServService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GetAllRequestedServicesHandler extends AbstractRequestHandler<String, ServsResponseBody> {
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ProviderCategoriesRepository providerCategoriesRepository;
    @Autowired
    private ServService servService;
    @Autowired
    private GeoClient geoClient;

    @Override
    protected void validatePermissionBeforeProcess(String providerId) {
        TokenSubject tokenSubject =
            (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) &&
            (tokenSubject.getUserId().equals(providerId))) {
            // provider role match & provider id match
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected ServsResponseBody processRequest(String providerId) {
        Optional<Provider> searchResult = providerRepository.findProviderByID(Long.parseLong(providerId));
        Provider provider = searchResult.orElse(null);
        if(provider == null) {
            throw new ProviderNotFoundException(providerId);
        }
        List<Serv> servList = serviceRepository.getAllServicesByStatus(ServiceStatus.requested.name());
        List<ProviderCategories> providerCategories =
            providerCategoriesRepository.findByProviderId(Long.parseLong(providerId));
        //get provider geoHash, match first 3 digit with service geohash
        try {
            if ( provider.getGeohash() == null ) {
                if (provider.getLatitude() == null || provider.getLongitude() == null) {
                    GeoData geoData = geoClient.getGeoData(provider.getAddress() + " united " +
                            "states");
                    if (geoData != null && geoData.getTotalResults() >= 1) {
                        Double lat = geoData.getResults().get(0).getGeometry().getLat();
                        Double lng = geoData.getResults().get(0).getGeometry().getLng();
                        provider.setLatitude(lat);
                        provider.setLongitude(lng);
                    }
                }
                if (provider.getLatitude() != null && provider.getLongitude() != null) {
                    String geohash = GeoHash.geoHashStringWithCharacterPrecision(provider.getLatitude(),
                            provider.getLongitude(), 12);
                    provider.setGeohash(geohash);
                }
            }
        } catch (HttpClientErrorException e) {
            System.out.println(e);
            //throw runtime error if geoClient API has error
            throw new GeoHashErrorException(e);
        }
        String providerGeo = provider.getGeohash().substring(0,3);
        System.out.println(providerGeo);
        //match service productId with provider productIds
        Set<Long> providerSupportedProductIds = providerCategories.stream()
            .filter(Objects::nonNull)
            .map(ProviderCategories::getProductId)
            .collect(Collectors.toSet());
        //final providerSupportedProductServs match provider's productIds, and match first 3 digit of provider's geoHash
        List<Serv> providerSupportedServs = servList.stream()
            .filter(serv -> providerSupportedProductIds.contains(serv.getProductId()))
            .map(servService::removeAddressInfo)
            .filter(serv -> serv.getGeohash() != null)
            .filter(serv -> serv.getGeohash().substring(0, 3).equals(providerGeo))
            .collect(Collectors.toList());
        System.out.println(providerSupportedServs);
        return new ServsResponseBody(providerSupportedServs);
    }
}
