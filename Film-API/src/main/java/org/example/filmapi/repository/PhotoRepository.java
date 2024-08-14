package org.example.filmapi.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.example.filmapi.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PhotoRepository extends JpaRepository<Photo, Long> {
  @Modifying
  @Transactional
  @Query("DELETE FROM Photo p WHERE p.comment.id = :commentId")
  void deleteByCommentId(@Param("commentId") Long commentId);

  Photo findPhotoByCommentId(Long commentId);

  Photo findPhotoByFilmId(Long filmId);
}
