package com.DiscussionForum.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DiscussionForum.model.Tag;
import com.DiscussionForum.model.User;
import com.DiscussionForum.service.AnswerService;
import com.DiscussionForum.service.CommentService;
import com.DiscussionForum.service.QuestionService;
import com.DiscussionForum.service.TagService;
import com.DiscussionForum.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Controller {

    @Autowired
    UserService userService;

    @Autowired
    TagService tagService;

    @Autowired
    QuestionService questionService;

    @Autowired
    CommentService commentService;

    @Autowired
    AnswerService answerService;

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

    @PostMapping("/login")
    public User checkUser(@RequestBody String[] info) {
        return userService.verifyPassword(info[0], info[1]);
    }

    @GetMapping("/tags")
    public List<Tag> tagNameStrings() {
        return tagService.getTagNames();
    }

    @PostMapping("/tags")
    public void addTags(@RequestBody String[] info) {
        User user = userService.getUserById(info[0]);
        tagService.newTags(user, Arrays.copyOfRange(info, 1, info.length));
    }
}
