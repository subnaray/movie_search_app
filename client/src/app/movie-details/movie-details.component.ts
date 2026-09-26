import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieDetails } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie?: MovieDetails;
  loading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    const imdbId = this.route.snapshot.paramMap.get('id');

    if (!imdbId) {
      this.loading = false;
      this.errorMessage = 'Movie ID is missing.';
      return;
    }

    this.movieService.getMovieDetails(imdbId).subscribe({
      next: (movie) => {
        this.loading = false;
        if (movie.Response === 'False') {
          this.errorMessage = movie.Error ?? 'Movie details were not found.';
          return;
        }
        this.movie = movie;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load movie details.';
      }
    });
  }

  posterUrl(): string {
    return this.movie?.Poster && this.movie.Poster !== 'N/A'
      ? this.movie.Poster
      : 'assets/images/movie-user.png';
  }
}
