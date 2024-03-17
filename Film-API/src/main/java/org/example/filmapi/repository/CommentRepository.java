package org.example.filmapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.filmapi.model.Comment;
public interface CommentRepository extends JpaRepository<Comment, Long>{
  static void deleteByUserId(Long id) {
  }
}
