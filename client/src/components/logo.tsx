import { cx } from "class-variance-authority";
import Link from "next/link";
import React from "react";

const logo = ({ className }: { className: string }) => {
  return (
    <Link
      className={cx(
        "title-font",
        "flex",
        "gap-2",
        "items-center",
        "text-gray-900",
        "dark:text-white",
        "md:mb-0",
        className
      )}
      href="/"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="h-10 w-10 text-white"
      >
        <circle cx="32" cy="32" r="32" fill="#A60023"></circle>
        <circle cx="32" cy="32" r="24" fill="#FFFFFF"></circle>
        <circle cx="32" cy="32" r="20" fill="#A60023"></circle>
        <circle cx="32" cy="32" r="12" fill="#FFFFFF"></circle>
      </svg>
      <div className="flex flex-col border-l pl-2">
        <h1 className="font-bold tracking-tight text-4xl h-8">Movie</h1>
        <h2 className="text-xl font-light">Finder</h2>
      </div>
    </Link>
  );
};

export default logo;
