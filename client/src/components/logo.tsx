import { cx } from "class-variance-authority";
import Link from "next/link";
import React from "react";

const logo = () => {
  return (
    <Link
      className={cx(
        "ml-6",
        "title-font",
        "flex",
        "gap-2",
        "items-center",
        "text-gray-900",
        "dark:text-white",
        "md:mb-0"
      )}
      href="/"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="h-8 w-8 text-white"
      >
        <circle cx="32" cy="32" r="32" fill="#A60023"></circle>
        <circle cx="32" cy="32" r="24" fill="#FFFFFF"></circle>
        <circle cx="32" cy="32" r="20" fill="#A60023"></circle>
        <circle cx="32" cy="32" r="12" fill="#FFFFFF"></circle>
      </svg>
      <div className="flex flex-col">
        <h1 className="font-bold tracking-tight text-2xl h-6">Movie</h1>
        <h2 className="text-xs font-light self-center">discoverer</h2>
      </div>
    </Link>
  );
};

export default logo;
