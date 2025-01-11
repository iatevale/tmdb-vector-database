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

const MovieList = ({ className }: { className: string }) => {
  const { form, movieResults, setMovieResults } =
    React.useContext(MovieProviderContext);
  const [infiniteScrollPage, setInfiniteScrollPage] = React.useState<number>(1);

  const params = useSearchParams();

  React.useEffect(() => {
    const page = Number(params.get("page") ?? "1");
    const fetch = async () => {
      if (movieResults.status === "loading") {
        return;
      }

      setMovieResults({
        ...movieResults,
        status: "loading",
      });

      const m = await fetchMovies(page, form.getValues());

      setMovieResults(m);
    };
    fetch();
    setInfiniteScrollPage(page);
  }, [params.get("page")]);

  if (movieResults.total === 0) {
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

    const m = await fetchMovies(infiniteScrollPage, form.getValues());

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

  console.log(
    Number(params.get("page") ?? "1" + 1) * 16,
    movieResults.total,
    Number(params.get("page") ?? "1" + 1) * 16 < movieResults.total
  );
  return (
    <div
      className={cx("flex", "flex-col", "pt-4", "w-full", "px-8", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="my-1">
          <PaginationWithLinks
            page={Number(params.get("page") ?? "1")}
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
          hasMore={infiniteScrollPage * 16 < movieResults.total}
          isLoading={movieResults.status === "loading"}
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
