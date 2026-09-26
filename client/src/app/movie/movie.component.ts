import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { MovieSearchItem } from '../models/movie.model';
import { MovieSearchState, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  searchTitle = '';
  movies: MovieSearchItem[] = [];
  loading = false;
  errorMessage = '';
  hasSearched = false;

  constructor(
    public readonly auth: AuthService,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    const state = this.movieService.getSearchState();
    this.searchTitle = state.searchTitle;
    this.movies = state.movies ?? [];
    this.hasSearched = state.hasSearched;
    this.errorMessage = state.errorMessage;
  }

  searchMovies(): void {
    const title = this.searchTitle.trim();

    if (!title) {
      this.errorMessage = 'Enter a movie title to search.';
      this.movies = [];
      this.saveSearchState();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.movies = [];
    this.hasSearched = true;

    this.movieService.searchMovies(title).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.Response === 'True') {
          this.movies = [...(response.Search ?? [])].sort((firstMovie, secondMovie) =>
            this.getReleaseYear(secondMovie.Year) - this.getReleaseYear(firstMovie.Year)
          );
        } else {
          this.errorMessage = response.Error ?? 'No movies found.';
        }
        this.saveSearchState();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = this.getApiErrorMessage(error);
        this.saveSearchState();
      }
    });
  }

  private saveSearchState(): void {
    const state: MovieSearchState = {
      searchTitle: this.searchTitle,
      movies: this.movies,
      hasSearched: this.hasSearched,
      errorMessage: this.errorMessage
    };
    this.movieService.setSearchState(state);
  }

  private getReleaseYear(year: string): number {
    const parsedYear = Number.parseInt(year.match(/\d{4}/)?.[0] ?? '', 10);
    return Number.isNaN(parsedYear) ? 0 : parsedYear;
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }

  getDisplayName(name: string | undefined): string {
    if (!name) {
      return 'Movie User';
    }

    const normalized = (name.includes('@') ? name.split('@')[0] : name)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[-_.]+/g, ' ');

    return normalized
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  posterUrl(movie: MovieSearchItem): string {
    return movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'assets/images/movie-user.png';
  }

  private getApiErrorMessage(error: any): string {
    if (error?.status === 401) {
      return 'Your login session is not authorized for the Movie API. Please log out and log in again.';
    }

    return error?.error?.message ?? 'Unable to search movies. Make sure the Spring Boot server is running.';
  }
}
