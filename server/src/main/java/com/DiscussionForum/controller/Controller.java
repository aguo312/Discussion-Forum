package com.DiscussionForum.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DiscussionForum.dto.LoginResponse;
import com.DiscussionForum.dto.QuestionWithTagDto;
import com.DiscussionForum.dto.UserDTO;
import com.DiscussionForum.exception.EmailAlreadyUsedException;
import com.DiscussionForum.exception.EmailNotFoundException;
import com.DiscussionForum.model.Answer;
import com.DiscussionForum.model.Comment;
import com.DiscussionForum.model.Tag;
import com.DiscussionForum.model.User;
import com.DiscussionForum.service.AnswerService;
import com.DiscussionForum.service.CommentService;
import com.DiscussionForum.service.JwtService;
import com.DiscussionForum.service.QuestionService;
import com.DiscussionForum.service.TagService;
import com.DiscussionForum.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

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

    @Autowired
    JwtService jwtService;

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
    public ResponseEntity<?> addUser(@RequestBody String[] info) {
        try {
            UserDTO newUser = userService.newUser(info[0], info[1], info[2]);
            return ResponseEntity.ok(newUser);
        } catch (EmailAlreadyUsedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> checkUser(@RequestBody String[] info, HttpServletResponse response) {
        try {
            LoginResponse loginResponse = userService.loginUser(info[0], info[1]);

            Cookie cookie = new Cookie("token", loginResponse.token());
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 30);
            response.addHeader("Set-Cookie", String.format(
                    "token=%s; HttpOnly; SameSite=Strict; Max-Age=%d; Path=/",
                    loginResponse.token(),
                    60 * 30));

            return ResponseEntity.ok(loginResponse.user());
        } catch (EmailNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password.\n");
        }

    }

    @GetMapping("/tags")
    public List<Tag> tagNameStrings() {
        return tagService.getTagNames();
    }

    @PostMapping("/tags")
    public void addTags(@RequestBody String[] info) {
        tagService.newTags(userService.getUserById(info[0]), Arrays.copyOfRange(info, 1, info.length));
    }

    @PostMapping("/question")
    public void addQuestion(@RequestBody String[] info) {
        questionService.newQuestion(info[0], info[1], info[2],
                Arrays.asList(Arrays.copyOfRange(info, 4, info.length)), info[3]);
    }

    @GetMapping("/question")
    public List<QuestionWithTagDto> allQuestions() {
        return questionService.getAllWithTags();
    }

    @GetMapping("/question/{qid}")
    public QuestionWithTagDto getQuestionById(@PathVariable String qid) {
        return questionService.getQuestionWithTagsById(qid);
    }

    @PostMapping("/answer")
    public void addAnswer(@RequestBody String[] info) {
        Answer ans = answerService.newAnswer(info[0], userService.getUserById(info[1]));
        questionService.updateQuestionAnswerById(info[2], ans);
    }

    @GetMapping("/answer/{aid}")
    public Answer getAnswerById(@PathVariable String aid) {
        return answerService.getAnswerById(aid);
    }

    @PostMapping("/comment")
    public void addComment(@RequestBody String[] info) {
        Comment com = commentService.newComment(info[0], userService.getUserById(info[1]));
        if (info[2].equals("question")) {
            questionService.updateQuestionCommentById(info[3], com);
        } else if (info[2].equals("answer")) {
            answerService.updateAnswerCommentById(info[3], com);
        }
    }

    @GetMapping("/comment/{cid}")
    public Comment getCommentById(@PathVariable String cid) {
        return commentService.getCommentById(cid);
    }

    // @GetMapping("/api/profile")
    // public ResponseEntity<?> getProfile(@CookieValue("token") String token) {
    // if (!jwtService.validateToken(token)) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or
    // expired token");
    // }

    // // Extract user info from the token
    // String email = jwtService.getEmailFromToken(token);
    // User user = userService.findByEmail(email);

    // UserDTO userDto = new UserDTO(user.getId(), user.getUsername(),
    // user.getEmail());
    // return ResponseEntity.ok(userDto);
    // }

}
