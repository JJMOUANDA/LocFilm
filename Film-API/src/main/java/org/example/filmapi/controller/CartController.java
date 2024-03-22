package org.example.filmapi.controller;
import org.example.filmapi.model.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.Cart;
import org.example.filmapi.repository.CartRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/location-film-api/carts")
public class CartController {

  @Autowired
  private CartRepository cartRepository;

  @GetMapping("/{cartId}/cartItems")
  public ResponseEntity<List<CartItem>> getCartItemsByCartId(@PathVariable Long cartId) {
    Optional<Cart> cart = cartRepository.findById(cartId);
    if (!cart.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    List<CartItem> cartItems = cart.get().getCartItems();
    return ResponseEntity.ok(cartItems);
  }

  @GetMapping
  public List<Cart> getAllCarts() {
    return cartRepository.findAll();
  }

  @PostMapping
  public Cart createCart(@RequestBody Cart cart) {
    return cartRepository.save(cart);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
    Optional<Cart> cart = cartRepository.findById(id);
    if (cart.isPresent()) {
      return ResponseEntity.ok(cart.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cartDetails) {
    Optional<Cart> cartOptional = cartRepository.findById(id);
    if (!cartOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    Cart cart = cartOptional.get();
    cart.setUserId(cartDetails.getUserId());
    // Assume cartDetails contains fields to be updated
    Cart updatedCart = cartRepository.save(cart);
    return ResponseEntity.ok(updatedCart);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteCart(@PathVariable Long id) {
    return cartRepository.findById(id)
        .map(cart -> {
          cartRepository.delete(cart); // Cela déclenchera la suppression en cascade des CartItem associés
          return ResponseEntity.noContent().build();
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

}
