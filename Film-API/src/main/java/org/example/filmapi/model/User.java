package org.example.filmapi.model;
import jakarta.persistence.*;

@Entity
@lombok.Getter
@lombok.Setter
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String username;
  private String passwordHash;
  private String email;

  private String role;

  private String state;

}
