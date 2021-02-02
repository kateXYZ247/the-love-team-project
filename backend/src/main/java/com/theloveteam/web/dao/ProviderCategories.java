package com.theloveteam.web.dao;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="provider_categories")
@IdClass(ProviderCategoriesId.class)
@Data
public class ProviderCategories {
    @Id
    @Column(name="provider_id")
    private Long providerId;

    @Id
    @Column(name="product_id")
    private Long productId;
}
