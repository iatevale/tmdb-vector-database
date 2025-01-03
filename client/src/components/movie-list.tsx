"use client";

import { MovieListProps, MovieType } from "@/types";
import React from "react";
import Image from "next/image";
import InfiniteScroll from "./ui/infinite-scroll";
import { Skeleton } from "./ui/skeleton";
import { cx } from "class-variance-authority";
import { MovieListPropsProviderContext } from "@/contexts/movie-list-props";

const MovieList = ({ page: actualPage }: { page: number }) => {
  const [loading, setLoading] = React.useState(false);
  const [infiniteListPage, setInfiniteListPage] = React.useState(actualPage);

  const { movieListProps, setMovieListProps } = React.useContext(
    MovieListPropsProviderContext
  );

  React.useEffect(() => {
    setMovieListProps(
      Object.assign({}, movieListProps, {
        page: actualPage,
        movies: [],
      }) as MovieListProps
    );
  }, []);

  const getMoviePage = async (page: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  };

  const next = async () => {
    setLoading(true);
    setInfiniteListPage(infiniteListPage + 1);

    const m = await getMoviePage(infiniteListPage);
    setMovieListProps(
      Object.assign({}, movieListProps, {
        movies: [...movieListProps.movies, ...m.data],
        page: infiniteListPage + 1,
        totalMovies: m.total,
      }) as MovieListProps
    );

    setLoading(false);
  };

  return (
    <div className="w-full max-[900px]:grid-cols-4 max-[600px]:grid-cols-3 max-[300px]:grid-cols-2 grid mx-auto mb-10 w-3/4 max-w-6xl grid-cols-5 gap-2 pb-10">
      {movieListProps.movies.map((movie: MovieType) => (
        <Image
          key={movie.id}
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-[20px] border border-gray-100 dark:border-gray-600"
        />
      ))}
      <InfiniteScroll
        hasMore={true}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {Array.from({ length: 1 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cx(
              "block",
              "w-[calc(100%-18px)]",
              "h-30",
              "rounded-[20px]",
              "border",
              "border-gray-100",
              "dark:border-gray-600"
            )}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
