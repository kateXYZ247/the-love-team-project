package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Product;
import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserNotFoundException;
import com.theloveteam.web.model.ProviderDetail;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.ProductService;
import com.theloveteam.web.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class GetProviderDetailHandler extends AbstractRequestHandler<String, ProviderDetail> {

    @Autowired
    private ProviderService providerService;

    @Autowired
    private ProductService productService;

    @Override
    protected void validatePermissionBeforeProcess(String providerId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole())) {
            // admins have permission to view all users' detail
            return;
        } else if (Role.provider.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(providerId)) {
            // user only has permission to view when userId matched
            return;
        } else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected ProviderDetail processRequest(String providerId) {
        Optional<Provider> providerOptional = providerService.getProviderByProviderId(Long.parseLong(providerId));
        List<String> productNames = providerOptional
                .map(provider -> providerService.getProductIdsByProviderId(provider.getProviderId()))
                .map(providerCategories -> providerCategories.stream()
                        .map(providerCategory -> providerCategory.getProductId())
                        .collect(Collectors.toList()))
                .map(productIds -> productService.getProductsByProductIds(productIds))
                .orElse(new ArrayList<>())
                .stream()
                .filter(Objects::nonNull)
                .map(Product::getProductName)
                .collect(Collectors.toList());
        return providerOptional.map(provider -> new ProviderDetail(provider, productNames)).orElse(null);

    }

    @Override
    protected void validatePermissionAndResponseAfterProcess(String providerId, ProviderDetail ProviderDetail) {
        if (ProviderDetail == null) {
            throw new UserNotFoundException(providerId);
        } else {
            //clean up un-public provider data
            ProviderDetail.getProvider().setPassword(null);
        }
    }
}
