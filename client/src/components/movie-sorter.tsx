"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { FiltersType } from "@/types";

const MovieSorter = () => {
  const { filters, setFilters } = React.useContext(MovieProviderContext);

  const handleSort = (orderBy: string, orderDirection: string) => {
    setFilters(
      Object.assign({}, filters, {
        page: 1,
        orderBy,
        orderDirection,
      })
    );
  };

  const getSortDescription = (filters: FiltersType) => {
    switch (filters.orderBy) {
      case "title":
        if (filters.orderDirection === "asc") {
          return "Alfabética ascendente";
        }
        return "Alfabética descendente";
      case "vote_average":
        if (filters.orderDirection === "asc") {
          return "Por nota ascendente";
        }
        return "Por nota descendente";
      case "release_date":
        if (filters.orderDirection === "asc") {
          return "Por fecha de estreno ascendente";
        }
        return "Por fecha de estreno descendente";
      default:
        return "Alfabética";
    }
  };

  const getSortIcon = (filters: FiltersType) => {
    switch (filters.orderBy) {
      case "title":
        return <ArrowUpAZ className="w-6 h-6 text-gray-500" />;
      case "vote_average":
        return <ArrowDown01 className="w-6 h-6 text-gray-500" />;
      case "release_date":
        return <ArrowDownNarrowWide className="w-6 h-6 text-gray-500" />;
      default:
        return <ArrowUpAZ className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-12">
          <div className="flex justify-between gap-4 items-center w-full py-2">
            {getSortIcon(filters)}
            <div className="flex flex-col items-start">
              <h2>Ordenación</h2>
              <p className="text-xs font-light">
                {getSortDescription(filters)}
              </p>
            </div>
            <ChevronsUpDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Ordenación</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSort("title", "asc")}
        >
          Alfabética ascendente
          <div className="ml-auto">
            <ArrowUpAZ className="w-4 h-4 text-gray-500" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSort("title", "desc")}
        >
          Alfabética descendente
          <div className="ml-auto">
            <ArrowDownAZ className="w-4 h-4 text-gray-500" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSort("vote_average", "asc")}
        >
          Por nota ascendente
          <div className="ml-auto">
            <ArrowDown01 className="w-4 h-4 text-gray-500" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSort("vote_average", "desc")}
        >
          Por nota descendente
          <div className="ml-auto">
            <ArrowDown10 className="w-4 h-4 text-gray-500" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSort("release_date", "asc")}
        >
          Por fecha de estreno ascendente
          <div className="ml-auto">
            <ArrowDownNarrowWide className="w-4 h-4 text-gray-500" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSort("release_date", "desc")}
        >
          Por fecha de estreno descendente
          <div className="ml-auto">
            <ArrowDownWideNarrow className="w-4 h-4 text-gray-500" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MovieSorter;
