import React from "react";
import ToggleTheme from "./toggle-theme";
import { cx } from "class-variance-authority";
import Link from "next/link";
import Logo from "./logo";
import SearchBar from "./search-bar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header
      className={cx(
        "mt-4",
        "w-full",
        "px-4",
        "md:px-8",
        "flex",
        "gap-8",
        "mb-2 ",
        "items-center",
        "justify-between"
      )}
    >
      <Logo className="w-1/4" />
      <div className="w-2/4 flex-1">
        <SearchBar className="hidden md:flex" />
      </div>
      <div className="flex justify-end">
        <Link
          href="https://github.com/iatevale/tmdb-vector-database"
          className={cx(
            "flex",
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
    </header>
  );
};

export default Header;
