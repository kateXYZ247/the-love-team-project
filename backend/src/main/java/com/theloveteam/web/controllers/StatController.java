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
public class StatController {
    @Autowired
    private GetAllServiceStatusHandler getAllServicesStatusHandler;
    @GetMapping(UrlConstants.STATUS_COUNT_BY_ADMIN)
    public ResponseEntity<StatResponseBody> getAllServiceStat(@RequestParam (name ="adminId") String adminId) {
        return getAllServicesStatusHandler.handle(adminId);
    }
}

