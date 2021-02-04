package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.handlers.GetAllServiceHistoryHandler;
import com.theloveteam.web.handlers.GetAllServicesHandler;
import com.theloveteam.web.handlers.GetAllUpcomingServicesHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServController {

    @Autowired
    private GetAllServicesHandler getAllServicesHandler;

    @Autowired
    private GetAllServiceHistoryHandler getAllServiceHistoryHandler;

    @Autowired
    private GetAllUpcomingServicesHandler getAllUpcomingServicesHandler;

    @GetMapping(UrlConstants.SERVICES_BY_PROVIDER_ID)
    public ResponseEntity<ServsResponseBody> getAllServs(@PathVariable String providerId) {
        return getAllServicesHandler.handle(providerId);
    }

    @GetMapping(value = UrlConstants.SERVICES_BY_PROVIDER_ID, params = {"providerId", "status"})
    public ResponseEntity<ServsResponseBody> getAllRequestedServs(@RequestParam String providerId, @RequestParam String status) {
        if (status.equals("requested")) {
            return getAllUpcomingServicesHandler.handle(providerId);
        }
        if (status.equals("upcoming")) {
            return getAllServicesHandler.handle((providerId));
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = UrlConstants.SERVICES_BY_PROVIDER_ID, params = "providerId")
    public ResponseEntity<ServsResponseBody> getAllServsHistory(@RequestParam String providerId) {
        return getAllServiceHistoryHandler.handle((providerId));
    }

}
