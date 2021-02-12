package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.Admin;

import com.theloveteam.web.handlers.GetAdminDetailHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    @Autowired
    private GetAdminDetailHandler getAdminDetailHandler;

    @GetMapping(UrlConstants.ADMINS_DETAILS)
    public ResponseEntity<Admin> getAdminDetail(@PathVariable String adminId) {
        return getAdminDetailHandler.handle(adminId);
    }


    }




