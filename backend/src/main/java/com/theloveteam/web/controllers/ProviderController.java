package com.theloveteam.web.controllers;

import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.handlers.GetProviderDetailHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProviderController {

    @Autowired
    private GetProviderDetailHandler getProviderDetailHandler;

    @GetMapping("/providers/{providerId}")
    public ResponseEntity<Provider> getProviderDetail(@PathVariable String providerId) {
        return getProviderDetailHandler.handle(providerId);
    }

    //update provider availability
}
