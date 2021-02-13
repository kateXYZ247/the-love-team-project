package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where p.productId in ?1")
    List<Product> findByProductIds(List<Long> productIds); //admin may use this in future

    @Query("select p from Product p where p.productId = ?1")
    Product findByProductId(Long productId); //admin may use this in future
}
