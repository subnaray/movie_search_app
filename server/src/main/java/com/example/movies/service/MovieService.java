package com.example.movies.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MovieService {

    private final RestClient restClient;
    private final String apiKey;

    public MovieService(
            RestClient.Builder builder,
            @Value("${omdb.api.url}") String apiUrl,
            @Value("${omdb.api.key}") String apiKey) {

        this.restClient = builder
                .baseUrl(apiUrl)
                .build();
        this.apiKey = apiKey;
    }

    public String searchMovies(String title) {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("apikey", apiKey)
                        .queryParam("s", title)
                        .build())
                .retrieve()
                .body(String.class);
    }

    public String getMovieDetails(String imdbId) {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("apikey", apiKey)
                        .queryParam("i", imdbId)
                        .queryParam("plot", "full")
                        .build())
                .retrieve()
                .body(String.class);
    }
}
