package com.devlog;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class PostService {
  private PostRepository postRepository;
  private UserRepository userRepository;

  public PostService(PostRepository postRepository, UserRepository userRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  public void createPost(CreatePostRequest request, String email) {
    UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
    PostEntity post = new PostEntity();
    post.setTitle(request.getTitle());
    post.setBody(request.getBody());
    post.setAuthorId(user.getId());
    post.setAuthorUsername(user.getUsername());
    postRepository.save(post);
  }

  public List<PostEntity> fetchPosts() {
    return postRepository.findAllByOrderByCreatedAtAsc();
  }
}
