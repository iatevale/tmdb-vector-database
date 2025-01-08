"use client";

import {
  MovieProviderProps,
  MovieProviderState,
  MovieResultsType,
} from "@/types";
import { createContext, useState } from "react";
import { defaultResults, FiltersSchema } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

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
  storageKey = "movies",
  ...props
}: MovieProviderProps) {
  const [movieResults, setMovieResults] = useState<MovieResultsType>(
    initialState.movieResults
  );

  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FiltersSchema>>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      ...FiltersSchema.parse({}),
      ...Object.fromEntries(searchParams),
    },
  });

  const formRef = React.useRef<HTMLFormElement>(null!);

  const onFormSubmit = (data: z.infer<typeof FiltersSchema>) => {
    toast({
      title: "Valores del formulario:",
      variant: "destructive",
      description: (
        <pre className="mt-2 w-[340px] rounded-md p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const handleFormSubmit = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      console.log("hola");

      if (formRef?.current) {
        form.handleSubmit(onFormSubmit)();
      }
    }
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
