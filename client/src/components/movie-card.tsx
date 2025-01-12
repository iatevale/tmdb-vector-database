import { MovieType } from "@/types";
import React from "react";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { format } from "date-fns";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  return (
    <div className="relative group">
      <div
        className={cx(
          "absolute",
          "top-2",
          "right-2",
          "opacity-80",
          "bg-orange-800",
          "py-1",
          "px-2",
          "text-white",
          "font-bold",
          "text-xs",
          "rounded-lg",
          "border",
          "border-orange-100",
          "dark:border-gray-600"
        )}
      >
        {movie.vote_average.toFixed(1)}
      </div>
      <Image
        src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        priority
        className="rounded-[20px] border border-gray-100 dark:border-gray-600"
      />
      <div
        className={cx(
          "absolute",
          "text-center",
          "bottom-2",
          "left-2",
          "right-2",
          "rounded-lg",
          "bg-black",
          "text-white",
          "px-2",
          "py-1",
          "opacity-80",
          "text-xs",
          "border",
          "border-gray-100",
          "dark:border-gray-600",
          "hidden",
          "group-hover:block"
        )}
      >
        {movie.title} ({format(movie.release_date, "yyyy")})
      </div>
    </div>
  );
};

export default MovieCard;
