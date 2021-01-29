package com.theloveteam.web.services;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.dto.RegisterRequestBody;
import com.theloveteam.web.model.LoginResult;
import com.theloveteam.web.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    };

    public List<User> findUserByEmail(String email) {return userRepository.findByEmail(email);}

    // check if the email address already in the database
    public boolean userExists(String email) {
        return findUserByEmail(email).size() > 0;
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
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public LoginResult validateEmailAndPassword(String email, String password) {
        List<User> users = userRepository.findByEmail(email);
        if(users.size() == 0) {
            return LoginResult.USER_NOT_FOUND;
        } else if (users.size() == 1) {
            return password.equals(users.get(0).getPassword()) ?
                    LoginResult.LOGIN_SUCCESS : LoginResult.PASSWORD_INCORRECT;
        } else {
            return LoginResult.SYSTEM_ERROR;
        }
    }




}
