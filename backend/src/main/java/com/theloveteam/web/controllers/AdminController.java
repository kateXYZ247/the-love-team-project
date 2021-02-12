package com.theloveteam.web.controllers;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.Admin;

import com.theloveteam.web.handlers.GetAdminDetailHandler;


import com.theloveteam.web.model.AdminDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {
    @Autowired
    private GetAdminDetailHandler getAdminDetailHandler;

    @PostMapping(UrlConstants.ADMIN_LOGIN)
    public ResponseEntity<Admin> getAdminDetail(@PathVariable String adminId) {
        return getAdminDetailHandler.handle(adminId);
    }

    }




