package org.example.filmapi.model;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@lombok.Getter
@lombok.Setter
public class Film {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private Date releaseDate;

  private String description;

  private String youtubeLink;

  private int price;

  private String state;
}
