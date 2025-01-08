"use client";

import { MovieType, MovieResultsType } from "@/types";
import React from "react";
import Image from "next/image";
import InfiniteScroll from "./ui/infinite-scroll";
import { Skeleton } from "./ui/skeleton";
import { cx } from "class-variance-authority";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { PaginationWithLinks } from "./ui/pagination-with-links";
import { fetchMovies, FiltersSchema } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import UpdateQueryParams from "./update-query-params";

const MovieList = ({ className }: { className: string }) => {
  const { form, movieResults, setMovieResults } =
    React.useContext(MovieProviderContext);

  const [infiniteScrollPage, setInfiniteScrollPage] = React.useState<number>();

  const params = useSearchParams();

  React.useEffect(() => {
    const fetch = async () => {
      if (
        movieResults.status === "loading" ||
        params.get("page") === null ||
        (params.get("page") === form.getValues().page.toString() &&
          movieResults.movies.length > 0)
      ) {
        return;
      }

      form.setValue("page", Number(params.get("page")));
      setMovieResults({
        ...movieResults,
        status: "loading",
      });

      const m = await fetchMovies({
        ...FiltersSchema.parse({}),
        page: Number(params.get("page")),
      });

      if (infiniteScrollPage === undefined) {
        setInfiniteScrollPage(
          params.get("page") ? Number(params.get("page")) : 1
        );
      }
      setMovieResults(m);
    };
    fetch();
  }, [movieResults, params]);

  if (form.getValues().page === null) {
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

  const next = async () => {
    if (
      !infiniteScrollPage ||
      movieResults.movies.length === 0 ||
      movieResults.status === "loading"
    ) {
      return;
    }

    setMovieResults({
      ...movieResults,
      status: "loading",
    });

    if (infiniteScrollPage) {
      setInfiniteScrollPage((infiniteScrollPage as number) + 1);
    }

    const m = await fetchMovies({
      ...form.getValues(),
      page: infiniteScrollPage,
    });

    const unionSinDuplicados = [
      ...new Map(
        [...movieResults.movies, ...m.movies].map((obj) => [obj.id, obj])
      ).values(),
    ];
    setMovieResults(
      Object.assign({}, movieResults, {
        movies: unionSinDuplicados,
        total: m.total,
        status: "success",
      }) as MovieResultsType
    );
  };

  return (
    <div
      className={cx("flex", "flex-col", "pt-4", "w-full", "px-8", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="my-1">
          <PaginationWithLinks
            page={Number(form.getValues().page)}
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
        <InfiniteScroll
          hasMore={true}
          isLoading={movieResults.status === "loading"}
          next={next}
        >
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
        <UpdateQueryParams />
      </div>
    </div>
  );
};

export default MovieList;
