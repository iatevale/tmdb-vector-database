import { filters } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultfilters: filters = {
  page: 1,
  orderBy: "release_date",
  orderDirection: "desc",
  totalMovies: 0,
  voteAverageMin: 7,
  voteAverageMax: 10,
  decadeMin: 1930,
  decadeMax: 2020,
};