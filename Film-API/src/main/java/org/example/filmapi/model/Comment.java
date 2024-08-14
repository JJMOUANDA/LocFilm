package org.example.filmapi.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.*;

@Entity
@lombok.Getter
@lombok.Setter
public class Comment {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  private Long id;

  private Long filmId;

  private Long userId;

  private String text;

  private Date date;
}
