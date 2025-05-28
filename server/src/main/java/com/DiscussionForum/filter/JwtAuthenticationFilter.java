package com.DiscussionForum.filter;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.DiscussionForum.model.AuthRequest;
import com.DiscussionForum.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        setFilterProcessesUrl("/auth/login"); // Override default login URL
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        try {
            AuthRequest authRequest = new ObjectMapper().readValue(request.getInputStream(), AuthRequest.class);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(), authRequest.getPassword());
            return authenticationManager.authenticate(authToken);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse login request", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException {

        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult
                .getPrincipal();

        // Use email as user ID (or load from DB for real ID)
        String token = jwtUtil.generateToken(user.getUsername());

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        response.getWriter().write("Login successful");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Login failed: " + failed.getMessage());
    }
}
