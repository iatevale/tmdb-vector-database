"use client";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const UpdateQueryParams = () => {
  const { movieFilters } = React.useContext(MovieProviderContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  React.useEffect(() => {
    const stringParams = Object.assign(
      Object.fromEntries(
        Object.entries(movieFilters).map(([key, value]) => [key, String(value)])
      )
    );
    const params = new URLSearchParams(stringParams);

    replace(`${pathname}?${params.toString()}`);
  }, [
    searchParams,
    movieFilters.decadeMin,
    movieFilters.decadeMax,
    movieFilters.orderBy,
    movieFilters.orderDirection,
    movieFilters.page,
    movieFilters.scoreMax,
    movieFilters.scoreMin,
  ]);
  return null;
};

export default UpdateQueryParams;
