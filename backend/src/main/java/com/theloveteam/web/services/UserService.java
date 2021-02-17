package com.theloveteam.web.services;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.dto.UpdateAccountRequestBody;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    // check if the email address or phone number already in the database
    public List<String> userExists(String email, String phone) {
        List<String> conflicts = new ArrayList<>();
        if (userRepository.findUsersByEmail(email).size() > 0) {
            conflicts.add(email);
        }
        if (userRepository.findUsersByPhone(phone).size() > 0) {
            conflicts.add(phone);
        }
        return conflicts;
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

    public Optional<User> getUserByUserId(Long userId) {
        return userRepository.findById(userId);
    }

    public void updateProfile(UpdateAccountRequestBody accountRequestBody,Optional<User> searchResult) {
        User user = searchResult.get();
        user.setFirstName(accountRequestBody.getFirstName());
        user.setLastName(accountRequestBody.getLastName());
        user.setAddress(accountRequestBody.getAddress());
        user.setZip(accountRequestBody.getZip());
        user.setPhone(accountRequestBody.getPhone());
        userRepository.save(user);
    }
}
