package com.theloveteam.web.services;

import com.theloveteam.web.dao.User;

import com.theloveteam.web.dto.LoginRequestBody;
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

import static java.util.Collections.emptyList;

@Service
public class SecurityService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginRequestBody loginRequestBody = JsonUtils.convertJsonStringToObject(username, LoginRequestBody.class);
        System.out.println("loginRequestBody: " + loginRequestBody);
        User user = userRepository.findUserByEmail(loginRequestBody.getLoginId()); //username is email
        if (user == null) {
            throw new UsernameNotFoundException(loginRequestBody.getLoginId());
        }
        System.out.println("Encrypted password: " + bCryptPasswordEncoder.encode(user.getPassword()));
        TokenSubject tokenSubject = TokenSubject.builder()
                .userId(String.valueOf(user.getUserId()))
                .role(Role.valueOf(user.getRole()))
                .build();
        return new LoginDetails(tokenSubject, user.getPassword(), emptyList());
    }

}