package com.devlog;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;
  private JwtService jwt;

  public AuthService(PasswordEncoder passwordEncoder, JwtService jwt, UserRepository userRepository) {
    this.passwordEncoder = passwordEncoder;
    this.jwt = jwt;
    this.userRepository = userRepository;
  }

  public LoginResponse login(LoginRequest request) {
    // check if email exists
    UserEntity user = userRepository.findByEmail(request.getEmail()).orElse(null);

    if (user == null) {
      throw new RuntimeException("User not found for email: " + request.getEmail());
    }
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new RuntimeException("Password does not match. Stored hash: " + user.getPassword());
    }

    String token = jwt.generateToken(user.getEmail(), user.getRole().name());
    return new LoginResponse(token, user.getUsername(), user.getRole().name());
  }

  public void signup(SignupRequest request) {
    UserEntity user = new UserEntity();
    user.setEmail(request.getEmail());
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    userRepository.save(user);
  }

}
