package org.example.filmapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.Cart;
import org.example.filmapi.model.CartItem;
import org.example.filmapi.model.Film;
import org.example.filmapi.repository.CartItemRepository;
import org.example.filmapi.repository.CartRepository;
import org.example.filmapi.repository.FilmRepository;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/location-film-api/cartItems")
public class CartItemController {

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private CartRepository cartRepository;

  @Autowired
  private FilmRepository filmRepository;

  @GetMapping
  public ResponseEntity<List<CartItem>> getAllCartItems() {
    List<CartItem> cartItems = cartItemRepository.findAll();
    return ResponseEntity.ok(cartItems);
  }

  @PostMapping
  public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem) {
    Long cartId = cartItem.getCart().getId();
    Long filmId = cartItem.getFilm().getId();

    Optional<Cart> cart = cartRepository.findById(cartId);
    Optional<Film> film = filmRepository.findById(filmId);

    if (!cart.isPresent() || !film.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    cartItem.setCart(cart.get());
    cartItem.setFilm(film.get());
    CartItem savedCartItem = cartItemRepository.save(cartItem);
    return ResponseEntity.ok(savedCartItem);
  }

  @GetMapping("/{id}")
  public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
    Optional<CartItem> cartItem = cartItemRepository.findById(id);
    return cartItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItemDetails) {
    return cartItemRepository.findById(id)
        .map(existingCartItem -> {
          // Assuming cartItemDetails contains fields to be updated
          // Directly setting the cart and film might not be safe without validation
          if(cartItemDetails.getCart() != null && cartItemDetails.getCart().getId() != null) {
            Optional<Cart> cart = cartRepository.findById(cartItemDetails.getCart().getId());
            cart.ifPresent(existingCartItem::setCart);
          }
          if(cartItemDetails.getFilm() != null && cartItemDetails.getFilm().getId() != null) {
            Optional<Film> film = filmRepository.findById(cartItemDetails.getFilm().getId());
            film.ifPresent(existingCartItem::setFilm);
          }

          return ResponseEntity.ok(cartItemRepository.save(existingCartItem));
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
    return cartItemRepository.findById(id)
        .map(cartItem -> {
          cartItemRepository.delete(cartItem);
          return ResponseEntity.noContent().build();
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
