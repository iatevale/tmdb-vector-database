"use client";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import React from "react";

const debug = () => {
  const { movieResults, form } = React.useContext(MovieProviderContext);

  return (
    <div className="bg-yellow-100 dark:bg-orange-900 rounded-lg p-2 flex flex-wrap justify-center items-start text-xs flex gap-4 w-full">
      {Object.entries(form.getValues()).map(([key, value]) => (
        <div key={key} className="text-center flex flex-col">
          <strong>{key}</strong> {value as React.ReactNode}
        </div>
      ))}
      {Object.entries(movieResults).map(([key, value]) => (
        <div key={key} className="text-center flex flex-col">
          <strong>{key}</strong>
          <span>{typeof value === "object" ? value.length : value}</span>
        </div>
      ))}
    </div>
  );
};

export default debug;
