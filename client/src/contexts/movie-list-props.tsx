"use client";

import {
  MovieFiltersType,
  MovieProviderProps,
  MovieProviderState,
  MovieResultsType,
} from "@/types";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";
import { defaultFilters, defaultResults } from "@/lib/utils";

const initialState = {
  movieFilters: defaultFilters,
  movieResults: defaultResults,
  setMovieFilters: () => null,
  setMovieResults: () => null,
};

export const MovieProviderContext =
  createContext<MovieProviderState>(initialState);

export function MovieProvider({
  children,
  storageKey = "movies",
  ...props
}: MovieProviderProps) {
  const params = useSearchParams();
  const [movieResults, setMovieResults] = useState<MovieResultsType>(
    initialState.movieResults
  );
  const [movieFilters, setMovieFilters] = useState<MovieFiltersType>(
    Object.assign({}, initialState.movieFilters, {
      page: params.get("page")
        ? parseInt(params.get("page") as string)
        : initialState.movieFilters.page,
      orderBy:
        (params.get("orderBy") as string) ?? initialState.movieFilters.orderBy,
      orderDirection:
        (params.get("orderDirection") as string) ??
        initialState.movieFilters.orderDirection,
      voteAverageMin: params.get("voteAverageMin")
        ? parseFloat(params.get("voteAverageMin") as string)
        : initialState.movieFilters.voteAverageMin,
      voteAverageMax: params.get("voteAverageMax")
        ? parseFloat(params.get("voteAverageMax") as string)
        : initialState.movieFilters.voteAverageMax,
      decadeMin: params.get("decadeMin")
        ? parseInt(params.get("decadeMin") as string)
        : initialState.movieFilters.decadeMin,
      decadeMax: params.get("decadeMax")
        ? parseInt(params.get("decadeMax") as string)
        : initialState.movieFilters.decadeMax,
    })
  );

  return (
    <MovieProviderContext.Provider
      {...props}
      value={{
        movieFilters,
        setMovieFilters,
        movieResults,
        setMovieResults,
      }}
    >
      {children}
    </MovieProviderContext.Provider>
  );
}
