"use client";

import { cx } from "class-variance-authority";
import React from "react";
import { Separator } from "./ui/separator";
import MovieSorter from "./movie-sorter";
import DecadeSlider from "./decade-slider";
import ScoreSlider from "./score-slider";
import { Paintbrush } from "lucide-react";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { defaultFilters } from "@/lib/utils";

const Sidebar = ({
  page,
  decadeMax,
  decadeMin,
  scoreMax,
  scoreMin,
  className,
}: {
  page: number;
  decadeMax: number;
  decadeMin: number;
  scoreMax: number;
  scoreMin: number;
  className: string;
}) => {
  const { movieFilters, setMovieFilters } =
    React.useContext(MovieProviderContext);

  React.useEffect(() => {
    setMovieFilters(
      Object.assign({}, movieFilters, {
        page,
        decadeMax,
        decadeMin,
        scoreMax,
        scoreMin,
      })
    );
  }, [page, decadeMax, decadeMin, scoreMin, scoreMax]);

  const handleReset = () => {
    setMovieFilters(defaultFilters);
  };

  const handleDecadeValuesChange = (values: number[]) => {
    setMovieFilters(
      Object.assign({}, movieFilters, {
        page: 1,
        decadeMin: values[0],
        decadeMax: values[1],
      })
    );
  };

  const handleScoreValuesChange = (values: number[]) => {
    setMovieFilters(
      Object.assign({}, movieFilters, {
        page: 1,
        scoreMin: values[0],
        scoreMax: values[1],
      })
    );
  };

  return (
    <aside
      className={cx(
        "flex",
        "flex-col",
        "justify-start",
        "items-center",
        "rounded-lg",
        "px-4",
        "dark:bg-gray-900",
        className
      )}
    >
      <div className="flex items-center  pt-3">
        <h1 className="text-xl flex-1 text-gray-600 dark:text-white">
          Filtros
        </h1>
        <Paintbrush
          onClick={handleReset}
          className="h-4 w-4 cursor-pointer hover:text-orange-700"
        />
      </div>
      <Separator />
      <div className="mt-2 flex flex-col gap-4 items-center">
        <MovieSorter />
        <DecadeSlider
          setDecade={handleDecadeValuesChange}
          range={[movieFilters.decadeMin, movieFilters.decadeMax]}
        />
        <ScoreSlider
          setScore={handleScoreValuesChange}
          range={[movieFilters.scoreMin, movieFilters.scoreMax]}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
