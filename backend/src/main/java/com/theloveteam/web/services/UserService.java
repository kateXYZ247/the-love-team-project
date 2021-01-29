package com.theloveteam.web.services;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    };

    public User findUserByEmail(String email) {return userRepository.findUserByEmail(email);}

    // check if the email address already in the database
    public boolean userExists(String email) {
        return findUserByEmail(email) != null;
    }

    // encrypt password and save the user info into the database
    public User registerAccount(RegisterRequestBody registerRequestBody) {
        // password encryption
        String enPassword = passwordEncoder.encode(registerRequestBody.getPassword());
        registerRequestBody.setPassword(enPassword);
        // prepare the user object with the required registration fields and save to repository
        User user = new User(registerRequestBody.getFirstName(),
                registerRequestBody.getLastName(),
                registerRequestBody.getEmail(),
                registerRequestBody.getPassword(),
                registerRequestBody.getPhone()
        );
//        user.setEnabled(true);
        return userRepository.save(user);
    }

}
