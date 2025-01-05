import { MovieFiltersType } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultResults = {
  data: [],
  total: 0,
};

export const defaultFilters: MovieFiltersType = {
  page: 1,
  orderBy: "release_date",
  orderDirection: "desc",
  voteAverageMin: 7,
  voteAverageMax: 10,
  decadeMin: 1930,
  decadeMax: 2020,
};