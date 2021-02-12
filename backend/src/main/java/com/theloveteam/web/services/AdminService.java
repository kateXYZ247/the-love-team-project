package com.theloveteam.web.services;

import com.theloveteam.web.dao.Admin;
import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.repositories.AdminRepository;
import com.theloveteam.web.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Optional<Admin> getAdminByAdminId(Long adminId) {
        return adminRepository.findById(adminId);
    }

}
