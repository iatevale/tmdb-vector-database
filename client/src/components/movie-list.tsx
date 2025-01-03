"use client";

import { MovieType } from "@/types";
import React from "react";
import Image from "next/image";
import InfiniteScroll from "./ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import { get } from "http";
import { Skeleton } from "./ui/skeleton";
import { cx } from "class-variance-authority";

const getMoviePage = async (page: number = 1) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

const MovieList = ({ page: actualPage }: { page: number }) => {
  const [page, setPage] = React.useState(actualPage);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [movies, setMovies] = React.useState<MovieType[]>([]);

  console.log(page);
  const next = async () => {
    setLoading(true);

    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const m = await getMoviePage(page);
      if (m.length === 0) {
        setHasMore(false);
      }

      setMovies((prev) => [...prev, ...m]);
      setPage((prev) => prev + 1);

      setLoading(false);
    });
  };

  return (
    <div className="w-full max-[900px]:grid-cols-4 max-[600px]:grid-cols-3 max-[300px]:grid-cols-2 grid mx-auto mb-10 w-3/4 max-w-6xl grid-cols-5 gap-2 pb-10">
      {movies.map((movie: MovieType) => (
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
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {hasMore &&
          Array.from({ length: 1 }).map((_, i) => (
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
