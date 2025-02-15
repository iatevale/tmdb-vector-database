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
import Debug from "./debug";
import { FormFilterSchema, getFormDefaults } from "@/lib/utils";
import EmbeddingSelector from "./embedding-selector";

const Sidebar = ({ className }: { className?: string }) => {
  const { form, formRef, handleFormSubmit } =
    React.useContext(MovieProviderContext);

  const handleReset = () => {
    const defaults = getFormDefaults(FormFilterSchema);
    form.reset(defaults);
    form.setValue("search", "");
    form.setValue("semanticSearch", "");
    form.setValue("page", 1);
    handleFormSubmit();
    localStorage.removeItem("formData");
  };

  const handleDecadeValuesChange = async (values: number[]) => {
    form.setValue("decadeMin", values[0].toString());
    form.setValue("decadeMax", values[1].toString());
    handleFormSubmit();
  };

  const handleScoreValuesChange = async (values: number[]) => {
    form.setValue("scoreMin", values[0].toString());
    form.setValue("scoreMax", values[1].toString());
    handleFormSubmit();
  };

  const handleGenresChange = async (values: string[]) => {
    form.setValue("genres", values);
    handleFormSubmit();
  };

  const handleSetEmbedding = (value: string) => {
    form.setValue("embedding", value);
    handleFormSubmit();
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
        "lg:w-1/3",
        className
      )}
    >
      <Form {...form} onSubmit={handleFormSubmit}>
        <form ref={formRef} className="w-full">
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
              setGenres={handleGenresChange}
              genres={form.getValues("genres")}
            />
            <EmbeddingSelector
              setEmbedding={handleSetEmbedding}
              embedding={form.getValues("embedding")}
            />
          </div>
          <SemanticSearch />
          <Debug />
          <Toaster />
        </form>
      </Form>
    </aside>
  );
};

export default Sidebar;
