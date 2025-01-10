"use client";
import React, { useContext } from "react";
import { cx } from "class-variance-authority";
import { FormControl, FormField, FormItem } from "./ui/form";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({ className }: { className: string }) => {
  const { form, onFormSubmit } = useContext(MovieProviderContext);
  const [search, setSearch] = React.useState<string>("");

  const debounced = useDebouncedCallback(() => {
    form.setValue("search", search);
    form.handleSubmit(onFormSubmit)();
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounced();
  };

  return (
    <div
      className={cx(
        "flex",
        "items-center",
        "justify-start",
        "flex-1",
        "w-full",
        "relative",
        className
      )}
    >
      <Input className="pl-9" placeholder="Buscar..." onChange={handleChange} />
      <Search
        className="absolute left-3 top-2 h-5 w-5 text-gray-500" // Posicionamiento absoluto
      />
    </div>
  );
};

export default SearchBar;
