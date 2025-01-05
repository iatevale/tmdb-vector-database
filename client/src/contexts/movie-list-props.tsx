"use client";

import {
  MovieListProps,
  MovieListPropsProviderProps,
  MovieListPropsProviderState,
} from "@/types";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";
import { defaultMovieListProps } from "@/lib/utils";

const initialState = {
  movieListProps: defaultMovieListProps,
  setMovieListProps: () => null,
};

export const MovieListPropsProviderContext =
  createContext<MovieListPropsProviderState>(initialState);

export function MovieListPropsProvider({
  children,
  storageKey = "movies",
  ...props
}: MovieListPropsProviderProps) {
  const params = useSearchParams();

  const [movieListProps, setMovieListProps] = useState<MovieListProps>(
    Object.assign({}, initialState.movieListProps, {
      page: params.get("page")
        ? parseInt(params.get("page") as string)
        : initialState.movieListProps.page,
      orderBy:
        (params.get("orderBy") as string) ??
        initialState.movieListProps.orderBy,
      orderDirection:
        (params.get("orderDirection") as string) ??
        initialState.movieListProps.orderDirection,
      voteAverageMin: params.get("voteAverageMin")
        ? parseFloat(params.get("voteAverageMin") as string)
        : initialState.movieListProps.voteAverageMin,
      voteAverageMax: params.get("voteAverageMax")
        ? parseFloat(params.get("voteAverageMax") as string)
        : initialState.movieListProps.voteAverageMax,
      decadeMin: params.get("decadeMin")
        ? parseInt(params.get("decadeMin") as string)
        : initialState.movieListProps.decadeMin,
      decadeMax: params.get("decadeMax")
        ? parseInt(params.get("decadeMax") as string)
        : initialState.movieListProps.decadeMax,
    })
  );

  return (
    <MovieListPropsProviderContext.Provider
      {...props}
      value={{
        movieListProps,
        setMovieListProps,
      }}
    >
      {children}
    </MovieListPropsProviderContext.Provider>
  );
}
