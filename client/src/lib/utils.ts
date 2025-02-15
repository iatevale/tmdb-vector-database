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

export const getFormDefaults = <Schema extends z.AnyZodObject>(schema: Schema) => {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()]
      return [key, undefined]
    })
  )
}

export const getFormLocalStorageValues = () => {
  if (typeof localStorage === "undefined") {
    return {};
  }

  const formData = localStorage.getItem("formData");
  if (!formData) {
    return {};
  }

  return JSON.parse(formData);
};


export const FiltersSchema = z.object({
  search: z.string().max(300).default(""),
  page: z.number().default(1),
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

export const fetchMovies = async (filters: z.infer<typeof FiltersSchema>): Promise<MovieResultsType> => {
  const stringParams = Object.assign(
    Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        String(value),
      ]))
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