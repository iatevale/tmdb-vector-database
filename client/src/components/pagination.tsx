"use client";
import React, { useContext } from "react";
import { PaginationWithLinks } from "./ui/pagination-with-links";
import { usePathname, useSearchParams } from "next/navigation";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { cx } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";

const Pagination = () => {
  const { movieResults } = useContext(MovieProviderContext);
  const params = useSearchParams();
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className={cx("flex", "items-center", "justify-end", "w-full")}>
      {movieResults && movieResults.total > 0 ? (
        <div className="my-1">
          <PaginationWithLinks
            page={Number(params.get("page") ?? "1")}
            pageSize={16}
            totalCount={movieResults.total}
          />
        </div>
      ) : (
        <Skeleton className="w-96 h-8" />
      )}
    </div>
  );
};

export default Pagination;
