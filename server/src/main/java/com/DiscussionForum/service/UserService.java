package com.DiscussionForum.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null)
            throw new UsernameNotFoundException("User not found");
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User newUser(String username, String email, String password) {
        return userRepository.save(new User(username, email, password));
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
