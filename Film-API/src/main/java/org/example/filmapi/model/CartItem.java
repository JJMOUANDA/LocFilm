package org.example.filmapi.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.*;

@Entity
@lombok.Getter
@lombok.Setter

public class CartItem {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "cartId", nullable = false)
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Cart cart;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "filmId", nullable = false)
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Film film;
}
