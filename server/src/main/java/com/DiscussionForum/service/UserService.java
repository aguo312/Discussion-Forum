package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User newUser(String username, String email, String password) {
        return userRepository.save(new User(username, email, password));
    }
}
