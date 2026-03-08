package com.devlog;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration}")
  private long expiration;

  private SecretKey key;

  public SecretKey genKey() {
    key = Keys.hmacShaKeyFor(secret.getBytes());
    return key;
  }

  public String generateToken(String email, String role) {
    return Jwts.builder()
        .subject(email)
        .claim("role", role)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(genKey()).compact();
  }

  private Claims getClaims(String token) {
    return Jwts.parser()
        .verifyWith(this.key)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  public String getEmail(String token) {
    return getClaims(token).getSubject();
  }

  public String getRole(String token) {
    return getClaims(token).get("role", String.class);
  }

  public boolean validateToken(String token) {
    try {
      getClaims(token);
      return true;
    } catch (JwtException err) {
      return false;
    }
  }
}
