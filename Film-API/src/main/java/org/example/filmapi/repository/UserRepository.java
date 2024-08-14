package org.example.filmapi.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.filmapi.model.User;
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findById(Long id);
}
