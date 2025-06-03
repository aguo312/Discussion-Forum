package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DiscussionForum.dto.UserDTO;
import com.DiscussionForum.exception.EmailAlreadyUsedException;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDTO newUser(String username, String email, String password) {
        if (userRepository.findByEmail(email) != null) {
            throw new EmailAlreadyUsedException("Email is already used by another user.\n");
        }
        User newUser = userRepository.save(new User(username, email, passwordEncoder.encode(password)));
        return new UserDTO(newUser.getId(), newUser.getUsername(), newUser.getEmail(), newUser.getReputation());
    }

    public User verifyPassword(String email, String password) {
        User user = getUserByEmail(email);
        if (user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public String verify(String email, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(email);
        }
        return "Fail";
    }

    public User getUserById(String id) {
        return userRepository.findById(id).get();
    }
}
