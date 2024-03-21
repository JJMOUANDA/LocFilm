package org.example.filmapi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.filmapi.model.Photo;
import org.example.filmapi.repository.PhotoRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/location-film-api/photos")
public class PhotoController {

  @Autowired
  private PhotoRepository photoRepository;

  @GetMapping
  public List<Photo> getAllPhotos() {
    return photoRepository.findAll();
  }

  @PostMapping
  public ResponseEntity<Photo> createPhoto(@RequestBody Photo photo) {
    Photo savedPhoto = photoRepository.save(photo);
    return ResponseEntity.ok(savedPhoto);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Photo> getPhotoById(@PathVariable Long id) {
    Optional<Photo> photo = photoRepository.findById(id);
    return photo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/film/{userId}")
  public ResponseEntity<Photo> getPhotoByfilmId(@PathVariable Long id) {
    Optional<Photo> photo = java.util.Optional.ofNullable(photoRepository.findPhotoByFilmId(id));
    return photo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Photo> updatePhoto(@PathVariable Long id, @RequestBody Photo photoDetails) {
    return photoRepository.findById(id)
        .map(existingPhoto -> {
          if(photoDetails.getFilmId() != null) existingPhoto.setFilmId(photoDetails.getFilmId());
          if(photoDetails.getImageData() != null) existingPhoto.setImageData(photoDetails.getImageData());
          Photo updatedPhoto = photoRepository.save(existingPhoto);
          return ResponseEntity.ok(updatedPhoto);
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deletePhoto(@PathVariable Long id) {
    return photoRepository.findById(id)
        .map(photo -> {
          photoRepository.delete(photo);
          return ResponseEntity.noContent().build();
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
