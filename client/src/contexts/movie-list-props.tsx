"use client";

import {
  MovieProviderProps,
  MovieProviderState,
  MovieResultsType,
} from "@/types";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";
import { defaultResults, FiltersSchema } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialState = {
  form: null,
  movieFilters: FiltersSchema.parse({}),
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
  const [movieFilters, setMovieFilters] = useState<
    z.infer<typeof FiltersSchema>
  >(FiltersSchema.parse({}));

  const form = useForm<z.infer<typeof FiltersSchema>>({
    resolver: zodResolver(FiltersSchema),
  });

  return (
    <MovieProviderContext.Provider
      {...props}
      value={{
        form,
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
