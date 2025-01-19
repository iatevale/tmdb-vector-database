"use client";

import { cx } from "class-variance-authority";
import React from "react";
import { Separator } from "./ui/separator";
import MovieSorter from "./movie-sorter";
import DecadeSlider from "./decade-slider";
import ScoreSlider from "./score-slider";
import { Paintbrush } from "lucide-react";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import SemanticSearch from "./semantic-search";
import { Toaster } from "./ui/toaster";
import { Form } from "./ui/form";
import GenreSelector from "./genre-selector";
import SearchBar from "./search-bar";

const Sidebar = ({ className }: { className?: string }) => {
  const [resetGenres, setResetGenres] = React.useState(false);
  const { form, formRef, handleFormSubmit, onFormSubmit } =
    React.useContext(MovieProviderContext);

  const handleReset = () => {
    form.reset();
    form.setValue("search", "");
    form.handleSubmit(onFormSubmit)();
    localStorage.setItem("formData", JSON.stringify(form.getValues()));
    setResetGenres(true);
    setTimeout(() => {
      setResetGenres(false);
    }, 500);
  };

  const handleDecadeValuesChange = async (values: number[]) => {
    form.setValue("decadeMin", values[0].toString());
    form.setValue("decadeMax", values[1].toString());
    form.handleSubmit(onFormSubmit)();
  };

  const handleScoreValuesChange = async (values: number[]) => {
    form.setValue("scoreMin", values[0].toString());
    form.setValue("scoreMax", values[1].toString());
    form.handleSubmit(onFormSubmit)();
  };

  const handeGenresChange = async (values: string[]) => {
    form.setValue("genres", values);
    form.handleSubmit(onFormSubmit)();
  };

  return (
    <aside
      className={cx(
        "flex",
        "flex-col",
        "justify-start",
        "items-center",
        "rounded-lg",
        "lg:max-w-1/4",
        className
      )}
    >
      <Form {...form} onSubmit={form.handleSubmit(onFormSubmit)}>
        <form ref={formRef}>
          <div className="flex items-center justify-end w-full">
            <Paintbrush
              onClick={handleReset}
              className="h-5 w-5 cursor-pointer hover:text-orange-700"
            />
          </div>

          <div className="mt-2 flex flex-col gap-2 items-center w-full">
            <SearchBar />
            <MovieSorter />
            <DecadeSlider
              setDecade={handleDecadeValuesChange}
              range={[form.getValues("decadeMin"), form.getValues("decadeMax")]}
            />
            <ScoreSlider
              setScore={handleScoreValuesChange}
              range={[form.getValues("scoreMin"), form.getValues("scoreMax")]}
            />
            <GenreSelector
              setGenres={handeGenresChange}
              genres={form.getValues("genres")}
              reset={resetGenres}
            />
          </div>
          <SemanticSearch />
          <Toaster />
        </form>
      </Form>
    </aside>
  );
};

export default Sidebar;
