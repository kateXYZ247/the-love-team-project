package com.theloveteam.web.services;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    // check if the email address already in the database
    public boolean userExists(String email) {
        return userRepository.findUsersByEmail(email).size() > 0;
    }

    // encrypt password and save the user info into the database
    public User registerAccount(RegisterRequestBody registerRequestBody) {
        // password encryption
        String enPassword = passwordEncoder.encode(registerRequestBody.getPassword());
        registerRequestBody.setPassword(enPassword);
        // prepare the user object with the required registration fields and save to repository
        User user = User.builder()
                .lastName(registerRequestBody.getLastName())
                .firstName(registerRequestBody.getFirstName())
                .password(registerRequestBody.getPassword())
                .email(registerRequestBody.getEmail())
                .phone(registerRequestBody.getPhone())
                .role(Role.user.name()).build();//user register default role_user

        return userRepository.save(user);
    }

}
