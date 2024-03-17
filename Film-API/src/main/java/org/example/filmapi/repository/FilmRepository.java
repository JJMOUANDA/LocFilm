package org.example.filmapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.filmapi.model.Film;
public interface FilmRepository extends JpaRepository<Film, Long> {
}
