package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.AllRequestedServsRequestBody;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.dto.UpdateServRequestBody;
import com.theloveteam.web.dto.UpdateServResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.handlers.GetAllRequestedServicesHandler;
import com.theloveteam.web.handlers.UpdateServStatusHandler;
import com.theloveteam.web.handlers.GetAllServiceHistoryHandler;
import com.theloveteam.web.handlers.GetAllUpcomingServicesHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

//    @GetMapping(UrlConstants.SERVICES_BY_QUERY)
//    public ResponseEntity<ServsResponseBody> getAllServs(@RequestParam(name = "status") String status,
//                                                         @RequestParam(name = "providerId") Long providerId) {
//        AllRequestedServsRequestBody allRequestedServsRequestBody = AllRequestedServsRequestBody.builder().providerId(providerId).status(status).build();
//        return getAllRequestedServicesHandler.handle(allRequestedServsRequestBody);
//    }

    @PatchMapping(UrlConstants.SERVICES_BY_SERVICE_ID)
    public ResponseEntity<UpdateServResponseBody> updateServ(@PathVariable String serviceId, @RequestBody UpdateServRequestBody updateServRequestBody) {
        updateServRequestBody.setServiceId(serviceId);
        return updateServStatusHandler.handle(updateServRequestBody);
    }

    @GetMapping(UrlConstants.SERVICES_BY_QUERY)
    public ResponseEntity<ServsResponseBody> getAllRequestedServs(@RequestParam(name = "providerId") String providerId,
                                                                  @RequestParam(name = "status") Optional<String> statusOptional) {
        return statusOptional.map(status -> {
            if (status.equals("requested")) {
                return getAllRequestedServicesHandler.handle(providerId);
            } else if (status.equals("upcoming")) {
                return getAllUpcomingServicesHandler.handle(providerId);
            } else {
                throw new UnknownRequestException();
            }
        }).orElse(getAllServiceHistoryHandler.handle((providerId)));
    }

//    @GetMapping(value = UrlConstants.SERVICES_BY_QUERY, params = "providerId")
//    public ResponseEntity<ServsResponseBody> getAllServsHistory(@RequestParam String providerId) {
//        return getAllServiceHistoryHandler.handle((providerId));
//    }

}
