"use client";
import React, { useContext } from "react";
import { cx } from "class-variance-authority";
import { FormControl, FormField, FormItem } from "./ui/form";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { Input } from "./ui/input";

const SearchBar = ({ className }: { className: string }) => {
  const { form, handleFormSubmit } = useContext(MovieProviderContext);

  return (
    <div
      className={cx(
        "flex",
        "items-center",
        "justify-start",
        "flex-1",
        "w-full",
        className
      )}
    >
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <FormItem className="flex w-full">
            <FormControl>
              <Input
                placeholder="Búsqueda por nombre..."
                {...field}
                onKeyDown={handleFormSubmit}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SearchBar;
