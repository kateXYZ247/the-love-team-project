package com.theloveteam.web.dao;

import java.util.UUID;


public class Product {
    private final UUID id;

    private final String category;

    private final String name;

    private final String content;

    private final int price;

    private final int duration;

    public Product(UUID id, String category, String name, String content, int price, int duration) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.content = content;
        this.price = price;
        this.duration = duration;
    }
}
