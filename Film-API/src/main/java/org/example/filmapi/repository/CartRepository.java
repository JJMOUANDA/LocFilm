package org.example.filmapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.filmapi.model.Cart;
public interface CartRepository extends JpaRepository<Cart, Long>{
  static void deleteByUserId(Long userId){};
}
