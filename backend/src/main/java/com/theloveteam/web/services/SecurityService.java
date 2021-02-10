package com.theloveteam.web.services;

import com.theloveteam.web.dao.Admin;
import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dao.User;

import com.theloveteam.web.dto.LoginRequestBody;
import com.theloveteam.web.repositories.AdminRepository;
import com.theloveteam.web.repositories.ProviderRepository;
import com.theloveteam.web.security.LoginDetails;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.UserRepository;
import com.theloveteam.web.utils.JsonUtils;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Collections.emptyList;

@Service
public class SecurityService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginRequestBody loginRequestBody = JsonUtils.convertJsonStringToObject(username, LoginRequestBody.class);
        System.out.println("loginRequestBody: " + loginRequestBody);

        String loginId = loginRequestBody.getLoginId();
        Role role = loginRequestBody.getRole();
        Optional<Long> idFromDb = Optional.ofNullable(null);
        Optional<String> passwordFromDb = Optional.ofNullable(null);

        if (Role.user.equals(loginRequestBody.getRole())) {
            User user = userRepository.findUserByEmail(loginId); //loginId is email
            if (user == null) {
                throw new UsernameNotFoundException(loginId);
            } else {
                idFromDb = Optional.ofNullable(user.getUserId());
                passwordFromDb = Optional.ofNullable(user.getPassword());
            }
        } else if (Role.provider.equals(loginRequestBody.getRole())) {
            Provider provider = providerRepository.findProviderByEmail(loginId);
            if (provider == null) {
                throw new UsernameNotFoundException(loginId);
            } else {
                idFromDb = Optional.ofNullable(provider.getProviderId());
                passwordFromDb = Optional.ofNullable(provider.getPassword());
            }
        } else if (Role.admin.equals(loginRequestBody.getRole())) {
            Admin admin = adminRepository.findAdminByEmail(loginId);
            if (admin == null) {
                throw new UsernameNotFoundException(loginId);
            } else {
                idFromDb = Optional.ofNullable(admin.getAdminId());
                passwordFromDb = Optional.ofNullable(admin.getPassword());
            }
        }

        System.out.println("Encrypted password: " + bCryptPasswordEncoder.encode(loginRequestBody.getPassword()));
        TokenSubject tokenSubject = TokenSubject.builder()
                .userId(String.valueOf(idFromDb.orElse((long) 0)))//userId is user_id
                .role(role)
                .build();
        return new LoginDetails(tokenSubject, passwordFromDb.orElse(""), emptyList());
    }

}