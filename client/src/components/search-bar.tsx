"use client";
import React, { useContext, useEffect } from "react";
import { cx } from "class-variance-authority";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { FormControl, FormField, FormItem } from "./ui/form";

const SearchBar = () => {
  const { form, onFormSubmit } = useContext(MovieProviderContext);

  const debounced = useDebouncedCallback(() => {
    form.handleSubmit(onFormSubmit)();
  }, 1000);

  useEffect(() => {
    debounced();
  }, [form.watch("search")]);

  return (
    <div
      className={cx(
        "flex",
        "items-center",
        "justify-start",
        "flex-1",
        "w-full",
        "relative"
      )}
    >
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="border-gray-200">
              <Input
                placeholder="Buscar por nombre..."
                className="pl-10"
                {...field}
              />
            </FormControl>
            <Search className="absolute left-3 top-0 h-5 w-5 text-gray-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SearchBar;
