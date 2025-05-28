package com.DiscussionForum.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private final String SECRET = "mysecretkey"; // Use env var or config in production
    private final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    // Generate JWT with user ID as subject
    public String generateToken(String userId) {
        return Jwts.builder()
            .setSubject(userId)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
            .compact();
    }

    // Validate token integrity and expiration
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET.getBytes()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false; // Invalid token or expired
        }
    }

    // Extract user ID from token subject
    public String extractUserId(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET.getBytes())
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}

