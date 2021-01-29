package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository <Product, Long> {

    @Query("select p from Product p where p.productId = ?1")
    List<Product> findByProId(int proId); //admin may use this in future
}
