package org.example.filmapi.controller;

import org.springframework.transaction.annotation.Transactional;
import org.example.filmapi.repository.CartRepository;
import org.example.filmapi.repository.CommentRepository;
import org.example.filmapi.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.User;
import org.example.filmapi.repository.UserRepository;
import org.springframework.beans.*;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import java.beans.PropertyDescriptor;

import java.util.*;

@RestController
@RequestMapping("/location-film-api/users")
public class UserController {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RentRepository rentRepository;

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userRepository.findAll());
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User savedUser = userRepository.save(user);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
 Optional<User> user = userRepository.findById(id);
    return ResponseEntity.ok().body(user);
  }


  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    Optional<User> userOptional = userRepository.findById(id);
    if (!userOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    User existingUser = userOptional.get();

    // Copie les propriétés non nulles du user fourni vers l'utilisateur existant
    String[] nullPropertyNames = getNullPropertyNames(user);
    BeanUtils.copyProperties(user, existingUser, nullPropertyNames);

    // Sauvegarde l'utilisateur existant après la mise à jour
    User updatedUser = userRepository.save(existingUser);

    return ResponseEntity.ok(updatedUser);
  }

  /**
   * Renvoie les noms des propriétés qui sont null dans l'objet donné.
   */
  private String[] getNullPropertyNames(Object source) {
    final BeanWrapper src = new BeanWrapperImpl(source);
    PropertyDescriptor[] pds = src.getPropertyDescriptors();

    java.util.Set<String> emptyNames = new HashSet<>();
    for(PropertyDescriptor pd : pds) {
      Object srcValue = src.getPropertyValue(pd.getName());
      if (srcValue == null) emptyNames.add(pd.getName());
    }
    String[] result = new String[emptyNames.size()];
    return emptyNames.toArray(result);
  }

  @Transactional
  @DeleteMapping("/{id}")
  public ResponseEntity<User> deleteUser(@PathVariable Long id) {
    org.example.filmapi.repository.CommentRepository.deleteByUserId(id);
    rentRepository.deleteByUserId(id);
    org.example.filmapi.repository.CartRepository.deleteByUserId(id);
    userRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
