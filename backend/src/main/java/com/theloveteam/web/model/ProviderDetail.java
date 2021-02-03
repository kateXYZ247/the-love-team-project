package com.theloveteam.web.model;

import com.theloveteam.web.dao.Provider;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProviderDetail {
    private Provider provider;
    private List<String> productName;
}
