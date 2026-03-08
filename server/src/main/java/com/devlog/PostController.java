package com.devlog;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {
  private PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping
  public ResponseEntity<Void> createPost(@Valid @RequestBody CreatePostRequest request,
      Authentication authentication) {
    String email = authentication.getName();
    postService.createPost(request, email);
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity<List<PostEntity>> fetchPosts() {
    return ResponseEntity.ok(postService.fetchPosts());
  }
}
