import React from "react";
import ToggleTheme from "./toggle-theme";
import { cx } from "class-variance-authority";
import Link from "next/link";
import Logo from "./logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Pagination from "./pagination";

const Header = () => {
  return (
    <header
      className={cx(
        "w-full",
        "flex",
        "flex-col",
        "lg:flex-row",
        "gap-x-4",
        "gap-y-2",
        "mb-2",
        "items-center",
        "justify-center",
        "md:justify-between"
      )}
    >
      <Logo className="w-1/4 md:justify-self-start" />
      <div className="flex flex-row items-center justify-between w-full flex-1">
        <Pagination />
        <div className="flex flex-row justify-start">
          <Link
            href="https://github.com/iatevale/tmdb-vector-database"
            className={cx(
              "flex",
              "ml-auto",
              "items-center",
              "justify-center",
              "hover:text-gray-600",
              "dark:hover:text-gray-300"
            )}
          >
            <GitHubLogoIcon className="w-6 h-6" />
          </Link>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};

export default Header;
