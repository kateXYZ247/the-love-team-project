package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.Product;
import com.theloveteam.web.dto.ProductsResponseBody;
import com.theloveteam.web.handlers.GetAllProductsHandler;
import com.theloveteam.web.repositories.ProductRepository;
import com.theloveteam.web.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private GetAllProductsHandler getAllProductsHandler;

    @GetMapping(UrlConstants.PRODUCTS)
    public ResponseEntity<ProductsResponseBody> getAllProducts() {
        return getAllProductsHandler.handle(null);
    }
}
