"use client";

import { cx } from "class-variance-authority";
import React from "react";
import { Separator } from "./ui/separator";
import MovieSorter from "./movie-sorter";
import DecadeSlider from "./decade-slider";
import ScoreSlider from "./score-slider";
import { Paintbrush } from "lucide-react";
import { MovieListPropsProviderContext } from "@/contexts/movie-list-props";
import { useContext } from "use-context-selector";

const Sidebar = ({
  page,
  decadeMax,
  decadeMin,
  voteAverageMax,
  voteAverageMin,
}: {
  page: number;
  decadeMax: number;
  decadeMin: number;
  voteAverageMax: number;
  voteAverageMin: number;
}) => {
  const { movieListProps, setMovieListProps } = useContext(
    MovieListPropsProviderContext
  );

  React.useEffect(() => {
    setMovieListProps(
      Object.assign({}, movieListProps, {
        page,
        decadeMax,
        decadeMin,
        voteAverageMax,
        voteAverageMin,
      })
    );
  }, [page, decadeMax, decadeMin, voteAverageMax, voteAverageMin]);

  const handleReset = () => {
    setMovieListProps({
      page: 1,
      orderBy: "release_date",
      orderDirection: "desc",
      totalMovies: 0,
      voteAverageMin: 7,
      voteAverageMax: 10,
      decadeMin: 1930,
      decadeMax: 2020,
    });
  };

  const handleDecadeValuesChange = (values: number[]) => {
    setMovieListProps(
      Object.assign({}, movieListProps, {
        page: 1,
        decadeMin: values[0],
        decadeMax: values[1],
      })
    );
  };

  const handleScoreValuesChange = (values: number[]) => {
    setMovieListProps(
      Object.assign({}, movieListProps, {
        page: 1,
        voteAverageMin: values[0],
        voteAverageMax: values[1],
      })
    );
  };

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
          range={[decadeMin, decadeMax]}
        />
        <ScoreSlider
          setScore={handleScoreValuesChange}
          range={[voteAverageMin, voteAverageMax]}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
