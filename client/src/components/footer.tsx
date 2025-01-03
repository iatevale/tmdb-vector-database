import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cx } from "class-variance-authority";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full">
      <Link
        href="https://github.com/iatevale/tmdb-vector-database"
        className={cx(
          "flex",
          "text-lg",
          "items-center",
          "justify-center",
          "p-4",
          "gap-2",
          "hover:text-yellow-800",
          "dark:hover:text-yellow-300"
        )}
      >
        <GitHubLogoIcon className="w-6 h-6" /> Github
      </Link>
    </footer>
  );
};

export default Footer;
