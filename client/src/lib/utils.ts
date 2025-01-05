import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultResults = {
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

export const QueryParamsFiltersSchema = z.object({
  page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
  search: z.string().max(300).default(""),
  orderBy: z.string().default("release_date"),
  orderDirection: z.string().default("desc"),
  scoreMin: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 7)),
  scoreMax: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 10)),
  decadeMin: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1900)),
  decadeMax: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 2020)),
  semanticSearch: z.string().default(""),
});
