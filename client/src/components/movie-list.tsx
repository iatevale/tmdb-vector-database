"use client";

import { MovieFiltersType, MovieType, MovieResultsType } from "@/types";
import React from "react";
import Image from "next/image";
import InfiniteScroll from "./ui/infinite-scroll";
import { Skeleton } from "./ui/skeleton";
import { cx } from "class-variance-authority";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { PaginationWithLinks } from "./ui/pagination-with-links";

const MovieList = ({ className }: { className: string }) => {
  const [loading, setLoading] = React.useState(false);
  const [infinitePage, setInfinitePage] = React.useState(1);

  const { movieFilters, setMovieFilters, movieResults, setMovieResults } =
    React.useContext(MovieProviderContext);

  React.useEffect(() => {
    const initialFetchMovies = async () => {
      if (loading) return;
      setLoading(true);

      const m = await fetchMovies(movieFilters.page);
      setMovieResults(m);
      setLoading(false);
    };

    initialFetchMovies();
    setInfinitePage(movieFilters.page);
  }, [
    movieFilters.page,
    movieFilters.decadeMax,
    movieFilters.decadeMin,
    movieFilters.orderBy,
    movieFilters.orderDirection,
    movieFilters.scoreMax,
    movieFilters.scoreMin,
  ]);

  if (movieFilters.page === null) {
    return (
      <Skeleton
        className={cx(
          "block",
          "w-full",
          "h-30",
          "rounded-[20px]",
          "border",
          "border-gray-100",
          "dark:border-gray-600"
        )}
      />
    );
  }

  const fetchMovies = async (page: number) => {
    const stringParams = Object.assign(
      Object.fromEntries(
        Object.entries(movieFilters).map(([key, value]) => [key, String(value)])
      ),
      { page: String(page) }
    );

    const params = new URLSearchParams(stringParams);
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
    url.search = params.toString();
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  };

  const next = async () => {
    if (movieResults.movies.length === 0 || loading) {
      return;
    }

    setLoading(true);
    setInfinitePage(infinitePage + 1);

    const m = await fetchMovies(infinitePage);

    const unionSinDuplicados = [
      ...new Map(
        [...movieResults.movies, ...m.movies].map((obj) => [obj.id, obj])
      ).values(),
    ];
    setMovieResults(
      Object.assign({}, movieResults, {
        movies: unionSinDuplicados,
        total: m.total,
      }) as MovieResultsType
    );

    setLoading(false);
  };

  return (
    <div
      className={cx("flex", "flex-col", "pt-4", "w-full", "px-8", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="my-1">
          <PaginationWithLinks
            page={movieFilters.page}
            pageSize={16}
            totalCount={movieResults.total}
          />
        </div>
      </div>

      <div className="w-full max-[900px]:grid-cols-4 max-[600px]:grid-cols-3 max-[300px]:grid-cols-2 grid mx-auto mb-10 w-3/4 max-w-6xl grid-cols-5 gap-2 pb-10">
        {movieResults.movies.map((movie: MovieType) => (
          <Image
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            priority
            className="rounded-[20px] border border-gray-100 dark:border-gray-600"
          />
        ))}
        <InfiniteScroll hasMore={true} isLoading={loading} next={next}>
          <Skeleton
            className={cx(
              "block",
              "w-full",
              "h-[160px] md:h-[240px]",
              "rounded-[20px]",
              "border",
              "border-gray-100",
              "dark:border-gray-600"
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MovieList;
