package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    @Query("select p from Provider p where p.providerId = ?1")
    Optional<Provider> findProviderByID(long providerId);

    @Query("select p from Provider p where p.email = ?1")
    Provider findProviderByEmail(String email);

    @Transactional
    @Modifying
    @Query("update Provider p set p.latitude = ?2, p.longitude = ?3, p.geohash = ?4 where p.providerId = ?1")
    void updateProviderGeodataByID(long providerID, double latitude, double longitude, String geohash);
}
