package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    @Query("select p from Provider p where p.providerId = ?1")
    Optional<Provider> findProviderByID(long providerId);

    @Query("select p from Provider p where p.email = ?1")
    Provider findProviderByEmail(String email);
}
