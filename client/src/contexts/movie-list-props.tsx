"use client";

import { filters, MovieProviderProps, MovieProviderState } from "@/types";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";
import { defaultfilters } from "@/lib/utils";

const initialState = {
  filters: defaultfilters,
  setFilters: () => null,
};

export const MovieProviderContext =
  createContext<MovieProviderState>(initialState);

export function MovieProvider({
  children,
  storageKey = "movies",
  ...props
}: MovieProviderProps) {
  const params = useSearchParams();

  const [filters, setFilters] = useState<filters>(
    Object.assign({}, initialState.filters, {
      page: params.get("page")
        ? parseInt(params.get("page") as string)
        : initialState.filters.page,
      orderBy:
        (params.get("orderBy") as string) ?? initialState.filters.orderBy,
      orderDirection:
        (params.get("orderDirection") as string) ??
        initialState.filters.orderDirection,
      voteAverageMin: params.get("voteAverageMin")
        ? parseFloat(params.get("voteAverageMin") as string)
        : initialState.filters.voteAverageMin,
      voteAverageMax: params.get("voteAverageMax")
        ? parseFloat(params.get("voteAverageMax") as string)
        : initialState.filters.voteAverageMax,
      decadeMin: params.get("decadeMin")
        ? parseInt(params.get("decadeMin") as string)
        : initialState.filters.decadeMin,
      decadeMax: params.get("decadeMax")
        ? parseInt(params.get("decadeMax") as string)
        : initialState.filters.decadeMax,
    })
  );

  return (
    <MovieProviderContext.Provider
      {...props}
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </MovieProviderContext.Provider>
  );
}
