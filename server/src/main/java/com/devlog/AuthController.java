package com.devlog;

import com.devlog.UserRepository;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private UserRepository userRepository;
  private AuthService authService;

  public AuthController(UserRepository userRepository, AuthService authService) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    return ResponseEntity.ok(authService.login(request));
  }

  @PostMapping("/signup")
  public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest request) {
    authService.signup(request);
    return ResponseEntity.ok().build();
  }

}
