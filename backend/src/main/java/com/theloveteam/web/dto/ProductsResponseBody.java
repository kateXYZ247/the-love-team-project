package com.theloveteam.web.dto;

import com.theloveteam.web.dao.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProductsResponseBody {
    private List<Product> products;
}
