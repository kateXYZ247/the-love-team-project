package com.theloveteam.web.services;

import com.theloveteam.web.dao.Product;
import com.theloveteam.web.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    public ProductRepository productRepository;

    public List<Product> getProductsByProductIds(List<Long> productIds) {
        return productRepository.findByProductIds(productIds);
    }

}
