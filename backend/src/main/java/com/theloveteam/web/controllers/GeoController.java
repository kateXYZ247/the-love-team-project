package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dto.*;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UnknownRequestException;
import com.theloveteam.web.handlers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
public class GeoController {
    @Autowired
    private GetAllServicesGeoHandler getAllServicesGeoHandler;
    @GetMapping(UrlConstants.GEO_GET_BY_ADMIN)
    public ResponseEntity<GeoResponseBody> getAllServiceGeo(@RequestParam(name ="adminId") String adminId) {
        return getAllServicesGeoHandler.handle(adminId);
    }

}
