import React from "react";
import ToggleTheme from "./toggle-theme";
import { cx } from "class-variance-authority";
import Link from "next/link";
import Logo from "./logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Pagination from "./pagination";
import SemanticSearch from "./semantic-search";
import EmbeddingSelector from "./embedding-selector";
import Google from "./google";

const Header = () => {
  return (
    <header
      className={cx(
        "w-full",
        "flex",
        "flex-col",
        "gap-x-4",
        "gap-y-2",
        "mb-2",
        "items-center",
        "justify-center",
        "md:justify-between"
      )}
    >
      <div className="flex flex-col md:flex-row justify-start items-center w-full md:gap-8">
        <div className="flex items-center justify-between w-full">
          <Logo className="flex-1 w-full md:w-1/4" />
          <div className="flex flex-row md:hidden justify-end gap-2 items-center ">
            <Google />
            <Link
              href="https://github.com/iatevale/tmdb-vector-database"
              className={cx("hover:text-gray-600", "dark:hover:text-gray-300")}
            >
              <GitHubLogoIcon className="w-6 h-6" />
            </Link>
            <ToggleTheme />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center w-full md:gap-8">
          <SemanticSearch />
          <EmbeddingSelector />
        </div>
        <div className="hidden md:flex md:flex-row gap-2 justify-end items-center w-full">
          <Google />
          <Link
            href="https://github.com/iatevale/tmdb-vector-database"
            className={cx("hover:text-gray-600", "dark:hover:text-gray-300")}
          >
            <GitHubLogoIcon className="w-6 h-6" />
          </Link>
          <ToggleTheme />
        </div>
      </div>
      <Pagination />
    </header>
  );
};

export default Header;
