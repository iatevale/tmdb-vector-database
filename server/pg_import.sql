DROP DATABASE IF EXISTS movies;
CREATE DATABASE movies;

\connect movies;

CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.peliculas (
    id SERIAL PRIMARY KEY,
    imdb_id TEXT,
    backdrop_path TEXT,
    budget BIGINT,
    original_title TEXT,
    overview TEXT,
    popularity NUMERIC,
    poster_path TEXT,
    release_date DATE,
    revenue BIGINT,
    runtime INT,
    status TEXT,
    tagline TEXT,
    title TEXT,
    vote_average NUMERIC,
    vote_count INT,
    spoken_languages TEXT,
    genres TEXT
);

\COPY public.peliculas(id,imdb_id,backdrop_path,budget,original_title,overview,popularity,poster_path,release_date,revenue,runtime,status,tagline,title,vote_average,vote_count,spoken_languages,genres) FROM '/Users/dave/dev/tmdb-vector-database/data/movies.csv' WITH (FORMAT csv, HEADER true);
