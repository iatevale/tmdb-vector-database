"use client";

import {
  MovieProviderProps,
  MovieProviderState,
  MovieResultsType,
} from "@/types";
import { createContext, useState } from "react";
import { defaultResults, fetchMovies, FiltersSchema } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import Spinner from "@/components/spinner";

const initialState = {
  form: null,
  formRef: null,
  movieResults: defaultResults,
  setMovieResults: () => null,
  handleFormSubmit: () => null,
  onFormSubmit: () => null,
};

export const MovieProviderContext =
  createContext<MovieProviderState>(initialState);

export function MovieProvider({
  children,
  // storageKey = "movies",
  ...props
}: MovieProviderProps) {
  const [movieResults, setMovieResults] = useState<MovieResultsType>(
    initialState.movieResults
  );

  const form = useForm<z.infer<typeof FiltersSchema>>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      ...FiltersSchema.parse({}),
    },
  });

  const formRef = React.useRef<HTMLFormElement>(null!);

  const onFormSubmit = async (data: z.infer<typeof FiltersSchema>) => {
    localStorage.setItem("formData", JSON.stringify(form.getValues()));

    toast({
      title: "Actualizando filtros",
      description: (
        <div className="flex items-center space-x-2 color-black">
          <Spinner />
          <div>Cargando...</div>
        </div>
      ),
    });

    if (movieResults.status === "loading") {
      return;
    }

    setMovieResults({
      ...movieResults,
      status: "loading",
    });

    const m = await fetchMovies(data);

    setMovieResults(m);
  };

  const handleFormSubmit = () => {
    form.handleSubmit(onFormSubmit)();
  };

  return (
    <MovieProviderContext.Provider
      {...props}
      value={{
        form,
        movieResults,
        setMovieResults,
        handleFormSubmit,
        onFormSubmit,
        formRef,
      }}
    >
      {children}
    </MovieProviderContext.Provider>
  );
}
