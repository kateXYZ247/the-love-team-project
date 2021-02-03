package com.theloveteam.web.dao;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Setter
public class ProviderCategoriesId implements Serializable {

    private Long providerId;

    private Long productId;
}
