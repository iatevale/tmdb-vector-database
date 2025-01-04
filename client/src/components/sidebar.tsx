import { cx } from "class-variance-authority";
import React from "react";
import { Separator } from "./ui/separator";
import MovieSorter from "./movie-sorter";
import DecadeSlider from "./decade-slider";
import ScoreSlider from "./score-slder";

const Sidebar = () => {
  return (
    <aside
      className={cx(
        "flex",
        "flex-col",
        "justify-start",
        "rounded-lg",
        "px-4",
        "py-1",
        "dark:bg-gray-900",
        "mt-6",
        "ml-2"
      )}
    >
      <h1 className="text-xl text-gray-600 dark:text-white text-center pt-3">
        Filtros
      </h1>
      <Separator />
      <div className="mt-2 flex flex-col gap-4 items-center">
        <MovieSorter />
        <DecadeSlider />
        <ScoreSlider />
      </div>
    </aside>
  );
};

export default Sidebar;
