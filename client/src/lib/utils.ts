import { MovieResultsType } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultResults: MovieResultsType = {
  status: "idle",
  movies: [],
  total: 0,
};

export const FiltersSchema = z.object({
  search: z.string().max(300).default(""),
  orderBy: z.string().default("release_date"),
  orderDirection: z.string().default("desc"),
  scoreMin: z.string().default("7"),
  scoreMax: z.string().default("10"),
  decadeMin: z.string().default("1900"),
  decadeMax: z.string().default("2020"),
  genres: z.array(z.string()).default([]),
  semanticSearch: z
    .string()
    .max(300, {
      message: "La búsqueda semántica no debe ser superior a 300 caracteres.",
    }).default(""),
});

export const fetchMovies = async (page: number, filters: z.infer<typeof FiltersSchema>) => {
  const stringParams = Object.assign(
    Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        String(value),
      ])),
    { page: String(page) }
  );

  const params = new URLSearchParams(stringParams);
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/movies?${params.toString()}`);
  url.search = params.toString();
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
};