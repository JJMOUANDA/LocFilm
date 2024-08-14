package org.example.filmapi.controller;

import org.example.filmapi.model.User;
import org.example.filmapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.Rent;
import org.example.filmapi.repository.RentRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/location-film-api/rents")
public class RentController {

  @Autowired
  private RentRepository rentRepository;

  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public List<Rent> getAllRents() {
    return rentRepository.findAll();
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Rent>> getAllRentsByUserId(@PathVariable Long userId) {
    Optional<User> user = userRepository.findById(userId);
    if (!user.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    List<Rent> rents = rentRepository.findByUser(user.get());
    return ResponseEntity.ok(rents);
  }
  @PostMapping
  public ResponseEntity<Rent> createRent(@RequestBody Rent rent) {
    if(rent.getUser() == null || rent.getUser().getId() == null) {
      return ResponseEntity.badRequest().body(null); // ID de l'utilisateur requis
    }
    Optional<User> user = userRepository.findById(rent.getUser().getId());
    if (!user.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    rent.setUser(user.get()); // Associez l'utilisateur trouvé à la location
    Rent savedRent = rentRepository.save(rent);
    return ResponseEntity.ok(savedRent);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Rent> getRentById(@PathVariable Long id) {
    Optional<Rent> rent = rentRepository.findById(id);
    return rent.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Rent> updateRent(@PathVariable Long id, @RequestBody Rent rentDetails) {
    // Vérifiez d'abord si la location existe.
    Optional<Rent> optionalRent = rentRepository.findById(id);
    if (!optionalRent.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    // Vérifiez ensuite si l'utilisateur associé à la location existe.
    // Cela suppose que rentDetails contient un objet User avec un ID valide.
    if (rentDetails.getUser() == null || rentDetails.getUser().getId() == null) {
      return ResponseEntity.badRequest().body(null); // Une réponse Bad Request si aucun utilisateur n'est fourni ou si l'ID de l'utilisateur est null.
    }
    Optional<User> user = userRepository.findById(rentDetails.getUser().getId());
    if (!user.isPresent()) {
      return ResponseEntity.notFound().build(); // Une réponse Not Found si l'utilisateur n'existe pas.
    }

    // Obtenez la location existante et mettez à jour ses champs.
    Rent existingRent = optionalRent.get();
    existingRent.setUser(user.get()); // Associez l'utilisateur trouvé à la location.
    existingRent.setFilmId(rentDetails.getFilmId()); // Assurez-vous de gérer correctement les autres champs, comme filmId.
    existingRent.setRentalDate(rentDetails.getRentalDate());
    existingRent.setReturnDate(rentDetails.getReturnDate());
    // Effectuez d'autres mises à jour de champs selon le besoin.

    Rent updatedRent = rentRepository.save(existingRent);
    return ResponseEntity.ok(updatedRent);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteRent(@PathVariable Long id) {
    if (!rentRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    rentRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}

