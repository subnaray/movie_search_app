package com.example.movies;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "omdb.api.key=test-key")
class MoviesApplicationTests {

    @Test
    void contextLoads() {
    }
}
