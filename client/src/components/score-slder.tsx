"use client";

import React from "react";
import { DualRangeSlider } from "./ui/dual-range-slider";
import { MovieListPropsProviderContext } from "@/contexts/movie-list-props";

const ScoreSlider = () => {
  const [values, setValues] = React.useState([7, 10]);
  const { movieListProps, setMovieListProps } = React.useContext(
    MovieListPropsProviderContext
  );

  const handleValuesChange = (values: number[]) => {
    setValues(values);
    setMovieListProps(
      Object.assign({}, movieListProps, {
        movies: [],
        page: 1,
        voteAverageMin: values[0],
        voteAverageMax: values[1],
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <p className="self-start mb-4">Nota</p>
      <div className="px-4 w-full">
        <DualRangeSlider
          label={(value) => value}
          value={values}
          onValueChange={handleValuesChange}
          min={7}
          max={10}
          step={1}
        />
      </div>
    </div>
  );
};

export default ScoreSlider;
