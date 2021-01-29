package com.theloveteam.web.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    private String category;

    @Column(name = "name")
    private String productName;

    @Column(name = "content")
    private String productDescription;

    @Column(name = "price")
    private double productPrice;

    private int duration;

    private boolean star;

    @Column(name = "image_url")
    private String imageURL;
}
