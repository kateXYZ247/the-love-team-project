package com.theloveteam.web.services;

import com.theloveteam.web.dao.User;
import com.theloveteam.web.model.LoginResult;
import com.theloveteam.web.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
