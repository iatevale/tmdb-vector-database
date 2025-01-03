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
        "w-full",
        "px-6",
        "flex",
        "gap-4",
        "mb-4 ",
        "items-center",
        "justify-between"
      )}
    >
      <Logo />
      <SearchBar />
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
    </header>
  );
};

export default Header;
