package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.dao.ProviderCategoriesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderCategoriesRepository extends JpaRepository<ProviderCategories, ProviderCategoriesId> {
    //use provider id find product id
    @Query("select p from ProviderCategories p where p.providerId = ?1")
    List<ProviderCategories> findByProviderId(Long providerId);

    @Query("select p.providerId from ProviderCategories p " +
        "where p.productId = :productId and p.providerId in :providerIdList")
    List<Long> findProviderIdsByProductIdFilteredByProviderIds(Long productId, List<Long> providerIdList);
}
