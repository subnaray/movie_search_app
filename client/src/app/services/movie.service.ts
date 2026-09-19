import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MovieDetails, MovieSearchResponse } from '../models/movie.model';

export interface MovieSearchState {
  searchTitle: string;
  movies: MovieSearchResponse['Search'];
  hasSearched: boolean;
  errorMessage: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly apiUrl = `${environment.apiUrl}/movies`;
  private searchState: MovieSearchState = {
    searchTitle: '',
    movies: [],
    hasSearched: false,
    errorMessage: ''
  };

  constructor(private readonly http: HttpClient) {}

  getSearchState(): MovieSearchState {
    return {
      ...this.searchState,
      movies: [...(this.searchState.movies ?? [])]
    };
  }

  setSearchState(state: MovieSearchState): void {
    this.searchState = {
      ...state,
      movies: [...(state.movies ?? [])]
    };
  }

  searchMovies(title: string): Observable<MovieSearchResponse> {
    const params = new HttpParams().set('title', title.trim());
    return this.http.get<MovieSearchResponse>(this.apiUrl, { params });
  }

  getMovieDetails(imdbId: string): Observable<MovieDetails> {
    const params = new HttpParams().set('imdbId', imdbId);
    return this.http.get<MovieDetails>(`${this.apiUrl}/details`, { params });
  }
}
