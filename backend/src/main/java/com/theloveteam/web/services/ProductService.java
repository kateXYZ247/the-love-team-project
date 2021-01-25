package com.theloveteam.web.services;

import com.theloveteam.web.dao.Product;
import com.theloveteam.web.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;


    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        productRepository.findAll();
        return products;
    }
}
