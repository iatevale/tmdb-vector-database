"use client";
import React, { useContext } from "react";
import { PaginationWithLinks } from "./ui/pagination-with-links";
import { usePathname, useSearchParams } from "next/navigation";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { cx } from "class-variance-authority";

const Pagination = () => {
  const { movieResults } = useContext(MovieProviderContext);
  const params = useSearchParams();
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className={cx("flex", "items-center", "justify-center", "w-full")}>
      <div className="my-1">
        <PaginationWithLinks
          page={Number(params.get("page") ?? "1")}
          pageSize={16}
          totalCount={movieResults.total}
        />
      </div>
    </div>
  );
};

export default Pagination;
