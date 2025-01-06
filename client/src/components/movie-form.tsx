"use client";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import React from "react";
import { Form } from "./ui/form";
import { Toaster } from "./ui/toaster";

const MovieForm = ({ children }: { children: React.ReactNode }) => {
  const { form, formRef, onFormSubmit } =
    React.useContext(MovieProviderContext);

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onFormSubmit)}>
        {children}
      </form>
      <Toaster />
    </Form>
  );
};

export default MovieForm;
