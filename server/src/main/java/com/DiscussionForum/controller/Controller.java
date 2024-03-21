package com.DiscussionForum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DiscussionForum.model.User;
import com.DiscussionForum.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Controller {

    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String getHello() {
        System.out.println("Hey");
        return "This is a message from the server.";
    }

    @GetMapping("/user/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/register")
    public User addUser(@RequestBody String[] info) {
        return userService.newUser(info[0], info[1], info[2]);
    }
}
