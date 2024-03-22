package org.example.filmapi.repository;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.filmapi.model.Comment;
public interface CommentRepository extends JpaRepository<Comment, Long>{
  static void deleteByUserId(Long id) {
  }
  List<Comment> findCommentsByFilmId(Long filmId);

  List<Comment> findCommentsByUserId(Long userId);

  static void deleteByFilmId(Long filmId) {
  }


}
