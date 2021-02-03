package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.handlers.GetAllAcceptedServicesHandler;
import com.theloveteam.web.handlers.GetAllServicesHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServController {

    @Autowired
    private GetAllServicesHandler getAllServicesHandler;

    @Autowired
    private GetAllAcceptedServicesHandler getAllAcceptedServicesHandler;

    @GetMapping(UrlConstants.SERVICES_BY_PROVIDER_ID)
    public ResponseEntity<ServsResponseBody> getAllServs(@PathVariable String providerId) {
        return getAllServicesHandler.handle(providerId);
    }

    @GetMapping(UrlConstants.SERVICES_ACCEPTED_BY_PROVIDER_ID)
    public ResponseEntity<ServsResponseBody> getAllAcceptedServs(@PathVariable String providerId) {
        return getAllAcceptedServicesHandler.handle(providerId);
    }


}
