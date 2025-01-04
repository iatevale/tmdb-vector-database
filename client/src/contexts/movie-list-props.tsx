"use client";

import {
  MovieListProps,
  MovieListPropsProviderProps,
  MovieListPropsProviderState,
} from "@/types";
import { createContext, useEffect, useState } from "react";

const initialState = {
  movieListProps: {
    page: 1,
    orderBy: "release_date",
    orderDirection: "desc",
    movies: [],
    totalMovies: 0,
    voteAverageMin: 7,
    voteAverageMax: 10,
    decadeMin: 1930,
    decadeMax: 2020,
  },
  setMovieListProps: () => null,
};

export const MovieListPropsProviderContext =
  createContext<MovieListPropsProviderState>(initialState);

export function MovieListPropsProvider({
  children,
  storageKey = "movies",
  ...props
}: MovieListPropsProviderProps) {
  const [movieListProps, setMovieListProps] = useState<MovieListProps>(
    initialState.movieListProps
  );

  useEffect(() => {
    const lsMovieProps = localStorage.getItem(storageKey);

    if (lsMovieProps) {
      const movieProps = JSON.parse(lsMovieProps ?? "{}");
      if (movieProps) {
        setMovieListProps(movieProps);
      }
    }
  }, []);

  return (
    <MovieListPropsProviderContext.Provider
      {...props}
      value={{
        movieListProps,
        setMovieListProps: (movieListProps: MovieListProps) => {
          localStorage.setItem(storageKey, JSON.stringify(movieListProps));
          setMovieListProps(movieListProps);
        },
      }}
    >
      {children}
    </MovieListPropsProviderContext.Provider>
  );
}
