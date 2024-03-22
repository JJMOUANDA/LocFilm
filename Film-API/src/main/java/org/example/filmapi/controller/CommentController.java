package org.example.filmapi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.Comment;
import org.example.filmapi.repository.CommentRepository;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/location-film-api/comments")
public class CommentController {

  @Autowired
  private CommentRepository commentRepository;

  @GetMapping
  public List<Comment> getAllComments() {
    return commentRepository.findAll();
  }

  @PostMapping
  public Comment createComment(@RequestBody Comment comment) {
    return commentRepository.save(comment);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      return ResponseEntity.ok(comment.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/film/{filmId}")
  public List<Comment> getCommentsByFilmId(@PathVariable Long filmId) {
    return commentRepository.findCommentsByFilmId(filmId);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
    Optional<Comment> commentOptional = commentRepository.findById(id);
    if (!commentOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    Comment comment = commentOptional.get();
    comment.setText(commentDetails.getText());
    comment.setUserId(commentDetails.getUserId());
    comment.setFilmId(commentDetails.getFilmId());
    // Assume commentDetails contains fields to be updated
    Comment updatedComment = commentRepository.save(comment);
    return ResponseEntity.ok(updatedComment);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteComment(@PathVariable Long id) {
    if (!commentRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    org.example.filmapi.repository.PhotoRepository.deleteByCommentId(id);
    commentRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
