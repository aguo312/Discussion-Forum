package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User newUser(String username, String email, String password) {
        return userRepository.save(new User(username, email, passwordEncoder.encode(password)));
    }

    public User verifyPassword(String email, String password) {
        User user = getUserByEmail(email);
        if (user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User getUserById(String id) {
        return userRepository.findById(id).get();
    }
}
