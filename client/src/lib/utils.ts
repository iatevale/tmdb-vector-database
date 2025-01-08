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
  page: z.number().int().min(1).default(1),
  search: z.string().max(300).default(""),
  orderBy: z.string().default("release_date"),
  orderDirection: z.string().default("desc"),
  scoreMin: z.number().min(7).max(10).default(7),
  scoreMax: z.number().min(7).max(10).default(10),
  decadeMin: z.number().min(1900).max(2020).default(1900),
  decadeMax: z.number().min(1900).max(2020).default(2020),
  semanticSearch: z
    .string()
    .max(300, {
      message: "La búsqueda semántica no debe ser superior a 300 caracteres.",
    })
    .default(""),
});

export const fetchMovies = async (filters: z.infer<typeof FiltersSchema>) => {
  const stringParams = Object.assign(
    Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        String(value),
      ])
    ),
  );

  const params = new URLSearchParams(stringParams);
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
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