"use client";

import {
  MovieProviderProps,
  MovieProviderState,
  MovieResultsType,
} from "@/types";
import { createContext, useState } from "react";
import { defaultResults, fetchMovies, FormFilterSchema } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast, useToast } from "@/hooks/use-toast";
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

  const { dismiss } = useToast();

  const form = useForm<z.infer<typeof FormFilterSchema>>({
    resolver: zodResolver(FormFilterSchema),
    defaultValues: {
      ...FormFilterSchema.parse({}),
    },
  });

  const formRef = React.useRef<HTMLFormElement>(null!);

  const onFormSubmit = async (data: z.infer<typeof FormFilterSchema>) => {
    localStorage.setItem("formData", JSON.stringify(form.getValues()));

    if (movieResults.status === "loading") {
      return;
    }

    const { id: toastId } = toast({
      title: "Actualizando filtros",
      description: (
        <div className="flex items-center space-x-2 color-black">
          <Spinner />
          <div>Cargando...</div>
        </div>
      ),
    });

    setMovieResults({
      ...movieResults,
      status: "loading",
    });

    const m = await fetchMovies(data);

    setMovieResults(m);
    setTimeout(() => {
      dismiss(toastId);
    }, 500);
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
