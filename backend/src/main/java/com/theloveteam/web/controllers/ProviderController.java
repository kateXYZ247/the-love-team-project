package com.theloveteam.web.controllers;

import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dto.ProviderAvailRequestBody;
import com.theloveteam.web.dto.ProviderAvailResponseBody;
import com.theloveteam.web.dto.UpdateProviderLocationRequestBody;
import com.theloveteam.web.dto.UpdateProviderLocationResponseBody;
import com.theloveteam.web.handlers.GetProviderDetailHandler;

import com.theloveteam.web.handlers.ProviderAvailUpdateHandler;
import com.theloveteam.web.handlers.UpdateProviderLocationHandler;
import com.theloveteam.web.model.ProviderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProviderController {

    @Autowired
    private GetProviderDetailHandler getProviderDetailHandler;

    @Autowired
    private ProviderAvailUpdateHandler providerAvailUpdateHandler;

    @Autowired
    private UpdateProviderLocationHandler updateProviderLocationHandler;

    @GetMapping("/providers/{providerId}")
    public ResponseEntity<ProviderDetail> getProviderDetail(@PathVariable String providerId) {
        return getProviderDetailHandler.handle(providerId);
    }

    //update provider availability
    @PutMapping("/providers/{providerId}/availability")
    public ResponseEntity<ProviderAvailResponseBody> updateAvail(@PathVariable String providerId,
                                                                 @RequestBody ProviderAvailRequestBody availRequestBody) {
        availRequestBody.setProviderId(providerId);
        return providerAvailUpdateHandler.handle(availRequestBody);
    }

    @PatchMapping("/providers/{providerId}/location")
    public ResponseEntity<UpdateProviderLocationResponseBody> updateProviderLocation(
        @PathVariable String providerId,
        @RequestBody UpdateProviderLocationRequestBody updateProviderLocationRequestBody) {
        updateProviderLocationRequestBody.setProviderId(providerId);
        return updateProviderLocationHandler.handle(updateProviderLocationRequestBody);
    }

}
