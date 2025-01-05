"use client";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import React from "react";

const debug = () => {
  const { movieFilters, movieResults } = React.useContext(MovieProviderContext);

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 flex flex-wrap justify-center items-start text-xs flex gap-4 w-full">
      {Object.entries(movieFilters).map(([key, value]) => (
        <div key={key} className="text-center flex flex-col">
          <strong>{key}</strong> {value as React.ReactNode}
        </div>
      ))}
      {Object.entries(movieResults).map(([key, value]) => (
        <div key={key} className="text-center flex flex-col">
          <strong>{key}</strong>{" "}
          {typeof value === "object" ? value.length : JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
};

export default debug;
