package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Admin;
import com.theloveteam.web.dao.Product;
import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dao.ProviderCategories;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.exceptions.UserNotFoundException;
import com.theloveteam.web.model.ProviderDetail;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.AdminService;
import com.theloveteam.web.services.ProductService;
import com.theloveteam.web.services.ProviderService;
import com.theloveteam.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class GetAdminDetailHandler extends AbstractRequestHandler<String, Admin> {
    @Autowired
    private AdminService adminService;

    @Override
    protected void validatePermissionBeforeProcess(String adminId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Role.admin.equals(tokenSubject.getRole()) && tokenSubject.getUserId().equals(adminId)) {
            // admins have permission to view all users' detail
            return;

        }else {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected Admin processRequest(String adminId) {
        return adminService.getAdminByAdminId(Long.parseLong(adminId)).orElse(null);
    }



    @Override
    protected void validatePermissionAndResponseAfterProcess(String userId, Admin admin) {
        if (admin == null) {
            throw new UserNotFoundException(userId);
        } else {
            // Clean up un-public user data
            admin.setPassword(null);
        }
    }
}
