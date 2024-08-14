package org.example.filmapi.repository;
import org.example.filmapi.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
