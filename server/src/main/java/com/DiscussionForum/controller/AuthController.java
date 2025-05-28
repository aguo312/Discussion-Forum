package com.DiscussionForum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DiscussionForum.model.AuthRequest;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.UserRepository;
import com.DiscussionForum.util.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password required");
        }
        if (userRepo.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest auth) {
        User user = userRepo.findByEmail(auth.getEmail());
        if (user != null && encoder.matches(auth.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getId());
            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true).secure(true).path("/").sameSite("Strict").build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true).secure(true).path("/").sameSite("Strict").maxAge(0).build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "token", required = false) String token) {
        if (token != null && jwtUtil.validateToken(token)) {
            String userId = jwtUtil.extractUserId(token);
            User user = userRepo.findById(userId).orElse(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}