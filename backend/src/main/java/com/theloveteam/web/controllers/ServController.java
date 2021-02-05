package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.AllRequestedServsRequestBody;
import com.theloveteam.web.dto.AllRequestedServsResponseBody;
import com.theloveteam.web.dto.UpdateServRequestBody;
import com.theloveteam.web.dto.UpdateServResponseBody;
import com.theloveteam.web.handlers.GetAllRequestedServicesHandler;
import com.theloveteam.web.handlers.UpdateServStatusHandler;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.handlers.GetAllServiceHistoryHandler;
import com.theloveteam.web.handlers.GetAllServicesHandler;
import com.theloveteam.web.handlers.GetAllUpcomingServicesHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServController {

    @Autowired
    private GetAllRequestedServicesHandler getAllRequestedServicesHandler;
    @Autowired
    private UpdateServStatusHandler updateServStatusHandler;
    @Autowired
    private GetAllUpcomingServicesHandler getAllUpcomingServicesHandler;
    @Autowired
    private GetAllServiceHistoryHandler getAllServiceHistoryHandler;



    @GetMapping(UrlConstants.SERVICES_BY_QUERY)
    public ResponseEntity<AllRequestedServsResponseBody> getAllServs(@RequestParam(name = "status") String status,
                                                                     @RequestParam(name = "providerId") Long providerId) {
        AllRequestedServsRequestBody allRequestedServsRequestBody = AllRequestedServsRequestBody.builder().providerId(providerId).status(status).build();
        return getAllRequestedServicesHandler.handle(allRequestedServsRequestBody);
    }

    @PatchMapping(UrlConstants.SERVICES_BY_SERVICE_ID)
    public ResponseEntity<UpdateServResponseBody> updateServ(@PathVariable String serviceId, @RequestBody UpdateServRequestBody updateServRequestBody) {
        updateServRequestBody.setServiceId(serviceId);
        return updateServStatusHandler.handle(updateServRequestBody);
    }

    @GetMapping(value = UrlConstants.SERVICES_BY_PROVIDER_ID, params = {"providerId", "status"})
    public ResponseEntity<ServsResponseBody> getAllRequestedServs(@RequestParam String providerId, @RequestParam String status) {
        if (status.equals("requested")) {
            return getAllServicesHandler.handle((providerId));
        }
        if (status.equals("upcoming")) {
            return getAllUpcomingServicesHandler.handle(providerId);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = UrlConstants.SERVICES_BY_PROVIDER_ID, params = "providerId")
    public ResponseEntity<ServsResponseBody> getAllServsHistory(@RequestParam String providerId) {
        return getAllServiceHistoryHandler.handle((providerId));
    }

}
