package org.example.filmapi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.Film;
import org.example.filmapi.repository.FilmRepository;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/location-film-api/films")
public class FilmController {

  @Autowired
  private FilmRepository filmRepository;

  @GetMapping
  public ResponseEntity<List<Film>> getAllFilms() {
    return ResponseEntity.ok(filmRepository.findAll());
  }

  @PostMapping
  public ResponseEntity<Film> createFilm(@RequestBody Film film) {
    return ResponseEntity.ok(filmRepository.save(film));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
    Optional<Film> film = filmRepository.findById(id);
    return film.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  // Ajouter les méthodes PUT

  @DeleteMapping("/{id}")
  public ResponseEntity<org.example.filmapi.model.User> deleteUser(@PathVariable Long id) {
    filmRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
