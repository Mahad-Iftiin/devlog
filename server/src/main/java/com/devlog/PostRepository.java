package com.devlog;

import com.devlog.PostEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
  public List<PostEntity> findAllByOrderByCreatedAtAsc();
}
