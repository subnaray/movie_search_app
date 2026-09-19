package com.example.movies.controller;

import com.example.movies.service.MovieService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movies")
@Validated
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> searchMovies(
            @RequestParam @NotBlank String title) {

        return ResponseEntity.ok(movieService.searchMovies(title.trim()));
    }

    @GetMapping(value = "/details", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMovieDetails(
            @RequestParam @NotBlank String imdbId) {

        return ResponseEntity.ok(movieService.getMovieDetails(imdbId.trim()));
    }
}
