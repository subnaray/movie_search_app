# Movie Search App

A secured full-stack movie search application built with Angular, Auth0, Spring Boot, Spring Security, and the OMDb API.

## Architecture

Angular (port 4200) -> Auth0 login/access token -> Spring Boot (port 8080) -> OMDb API

## Prerequisites

- Node.js 18+
- npm
- Java 17+
- Maven (or use the included Maven wrapper)
- An Auth0 SPA application and API configured for `https://movie-search-api`
- An OMDb API key

## Auth0 configuration

The Angular client configuration is in:

`client/src/environments/environment.ts`

The Spring Boot issuer and audience are in:

`server/src/main/resources/application.properties`

In Auth0, use these development URLs:

- Allowed Callback URLs: `http://localhost:4200`
- Allowed Logout URLs: `http://localhost:4200`
- Allowed Web Origins: `http://localhost:4200`

## Run the Spring Boot server

From the project root:

```bash
export OMDB_API_KEY="your_omdb_api_key"
cd server
./mvnw spring-boot:run
```

The API will run at `http://localhost:8080`.

## Run the Angular client

In a second terminal:

```bash
cd client
npm install
npm start
```

Open `http://localhost:4200`.

## API endpoints

Both endpoints require a valid Auth0 bearer token.

- `GET /api/movies?title=Inception`
- `GET /api/movies/details?imdbId=tt1375666`

## Security note

Never commit the OMDb API key or an Auth0 client secret. The Auth0 SPA client ID is public configuration and is stored in the Angular environment file.
