package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Product;
import com.theloveteam.web.dto.ProductsDetailResponseBody;
import com.theloveteam.web.dto.ProductsResponseBody;
import com.theloveteam.web.exceptions.UserAlreadyExistsException;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetAllProductsHandler extends AbstractRequestHandler<String, ProductsResponseBody>{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductsResponseBody processRequest(String s) {
        List<Product> productList = productRepository.findAll();
        System.out.println(productList);
        return new ProductsResponseBody(productList);
    }
}
