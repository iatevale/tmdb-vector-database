"use client";
import { MovieListPropsProviderContext } from "@/contexts/movie-list-props";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const UpdateQueryParams = () => {
  const { movieListProps } = React.useContext(MovieListPropsProviderContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  React.useEffect(() => {
    const stringParams = Object.assign(
      Object.fromEntries(
        Object.entries(movieListProps).map(([key, value]) => [
          key,
          String(value),
        ])
      )
    );
    const params = new URLSearchParams(stringParams);

    replace(`${pathname}?${params.toString()}`);
  }, [
    searchParams,
    movieListProps.decadeMin,
    movieListProps.decadeMax,
    movieListProps.orderBy,
    movieListProps.orderDirection,
    movieListProps.page,
    movieListProps.voteAverageMax,
    movieListProps.voteAverageMin,
  ]);
  return null;
};

export default UpdateQueryParams;
