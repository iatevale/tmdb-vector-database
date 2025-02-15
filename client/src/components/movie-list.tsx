"use client";

import { MovieType, MovieResultsType } from "@/types";
import React from "react";
import InfiniteScroll from "./ui/infinite-scroll";
import { Skeleton } from "./ui/skeleton";
import { cx } from "class-variance-authority";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import {
  defaultResults,
  fetchMovies,
  getFormLocalStorageValues,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MovieCard from "./movie-card";

const MovieList = ({ className }: { className?: string }) => {
  const [movieList, setMovieList] =
    React.useState<MovieResultsType>(defaultResults);
  const [infiniteScrollLoading, setInfiniteScrollLoading] =
    React.useState(false);

  const [firstMount, setFirstMount] = React.useState(true);
  const { form, handleFormSubmit, movieResults } =
    React.useContext(MovieProviderContext);
  const [infiniteScrollPage, setInfiniteScrollPage] = React.useState<number>(1);
  const params = useSearchParams();
  const page = Number(params.get("page") ?? "1");

  React.useEffect(() => {
    if (form.getValues().page === page) {
      return;
    }
    form.setValue("page", page);
    handleFormSubmit();
  }, [page, form, handleFormSubmit]);

  React.useEffect(() => {
    setMovieList(movieResults);
  }, [movieResults]);

  React.useEffect(() => {
    setInfiniteScrollPage(page);
  }, [page]);

  React.useEffect(() => {
    if (firstMount) {
      const localStorageFormValues = getFormLocalStorageValues();
      if (localStorageFormValues) {
        form.reset(localStorageFormValues);
        handleFormSubmit();
      }
      setFirstMount(false);
    }
  }, [firstMount, form, handleFormSubmit, setFirstMount]);

  const next = async () => {
    if (
      !infiniteScrollPage ||
      movieList.movies.length === 0 ||
      movieList.status === "loading"
    ) {
      return;
    }
    setInfiniteScrollLoading(true);

    const m = await fetchMovies(
      Object.assign(form.getValues(), { page: infiniteScrollPage + 1 })
    );

    const unionSinDuplicados = [
      ...new Map(
        [...movieList.movies, ...m.movies].map((obj) => [obj.id, obj])
      ).values(),
    ];

    setMovieList(
      Object.assign({}, movieList, {
        movies: unionSinDuplicados,
        total: m.total,
        status: "success",
      }) as MovieResultsType
    );
    setInfiniteScrollPage(infiniteScrollPage + 1);
    setInfiniteScrollLoading(false);
  };

  return (
    <div
      className={cx(
        "flex",
        "flex-col",
        "mt-4",
        "pt-4",
        "w-full",
        "lg:w-3/4",
        className
      )}
    >
      <div
        className={cx(
          "w-full",
          "grid-cols-5",
          "max-[1200px]:grid-cols-4",
          "max-[600px]:grid-cols-3",
          "max-[300px]:grid-cols-2",
          "grid",
          "mx-auto",
          "mb-10",
          "w-3/4",
          "max-w-6xl",
          "gap-2",
          "pb-10"
        )}
      >
        {movieList.movies.map((movie: MovieType) => (
          <Link
            key={movie.id}
            href={`/peli/${movie.title_slug}?embedding=${form.getValues(
              "embedding"
            )}`}
          >
            <MovieCard movie={movie} />
          </Link>
        ))}
        <InfiniteScroll
          hasMore={infiniteScrollPage * 16 < movieList.total}
          isLoading={infiniteScrollLoading}
          next={next}
        >
          <Skeleton
            className={cx(
              "block",
              "w-full",
              "bg-white",
              "h-[160px] md:h-[240px]"
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MovieList;
