package com.theloveteam.web.handlers;


import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.AllRequestedServsRequestBody;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.ServiceStatus;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ProviderCategoriesRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import com.theloveteam.web.services.ServService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GetAllRequestedServicesHandler extends AbstractRequestHandler<String, ServsResponseBody> {
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ProviderCategoriesRepository providerCategoriesRepository;
    @Autowired
    private ServService servService;

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
        List<Serv> servList = serviceRepository.getAllServicesByStatus(ServiceStatus.requested.name());
        List<ProviderCategories> providerCategories =
            providerCategoriesRepository.findByProviderId(Long.parseLong(providerId));
        //match service productId with provider productIds
        Set<Long> providerSupportedProductIds = providerCategories.stream()
            .filter(Objects::nonNull)
            .map(ProviderCategories::getProductId)
            .collect(Collectors.toSet());

        List<Serv> providerSupportedServs = servList.stream()
            .filter(serv -> providerSupportedProductIds.contains(serv.getProductId()))
            .map(servService::removeAddressInfo)
            .collect(Collectors.toList());
        System.out.println(providerSupportedServs);
        return new ServsResponseBody(providerSupportedServs);
    }
}
