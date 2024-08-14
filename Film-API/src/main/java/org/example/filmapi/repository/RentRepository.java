package org.example.filmapi.repository;
import org.example.filmapi.model.User;
import java.util.*;
import org.example.filmapi.model.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentRepository extends JpaRepository<Rent, Long> {

  List<Rent> findByUser(User user);

  void deleteByUserId(Long id);
}
