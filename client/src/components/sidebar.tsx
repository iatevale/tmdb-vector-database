"use client";

import { cx } from "class-variance-authority";
import React from "react";
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
  const { form, formRef, onFormSubmit } =
    React.useContext(MovieProviderContext);

  const handleReset = () => {
    form.reset();
    form.setValue("search", "");
    form.setValue("semanticSearch", "");
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
        "w-full",
        "lg:w-1/4",
        className
      )}
    >
      <Form {...form} onSubmit={form.handleSubmit(onFormSubmit)}>
        <form ref={formRef} className="w-full md:w-auto">
          <div
            className={cx(
              "flex",
              "items-center",
              "justify-end",
              "w-full",
              "gap-2",
              "cursor-pointer",
              "hover:text-orange-700"
            )}
            onClick={handleReset}
          >
            Resetear filtros
            <Paintbrush className="h-5 w-5" />
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
