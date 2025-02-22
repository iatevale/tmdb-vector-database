"use client";

import * as React from "react";
import { FaGun } from "react-icons/fa6";
import { FaHatCowboySide } from "react-icons/fa";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { FaRegLaughBeam } from "react-icons/fa";
import { searchMovies } from "@/lib/utils";
import { MovieType } from "@/types";
import { RiMovie2Line } from "react-icons/ri";
import Link from "next/link";
import { EmbeddingProviderContext } from "@/contexts/embedding";
import { cx } from "class-variance-authority";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SemanticSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [semanticSearch, setSemanticSearch] = React.useState("");
  const [results, setResults] = React.useState<MovieType[]>([]);
  const { embedding } = React.useContext(EmbeddingProviderContext);
  const router = useRouter();

  const search = async (value: string) => {
    if (value.length === 0) {
      setResults([]);
      return;
    }
    const m = await searchMovies(value);
    setResults(m.movies.slice(0, 3));
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const submitSemanticSearch = async (semanticSearch: string) => {
    if (semanticSearch) {
      setSemanticSearch(semanticSearch);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/movies/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: semanticSearch }),
      }
    );
    const { movie } = await response.json();

    setSemanticSearch("");
    setResults([]);
    closeSemanticSearch();
    router.push(`/peli/${movie.title_slug}?embedding=${embedding}`);
  };

  const closeSemanticSearch = () => {
    setResults([]);
    setOpen(false);
  };

  const setSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSemanticSearch(e.currentTarget.value);
  };

  return (
    <div className="w-full flex justify-center my-4">
      <Button
        variant="outline"
        type="button"
        onClick={() => setOpen(true)}
        className="text-muted-foreground text-lg"
      >
        Búsqueda semántica
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>S
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="text-lg font-bold"></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="flex justify-between items-center px-4 gap-4">
          <CommandInput
            onKeyUp={setSearch}
            onValueChange={search}
            placeholder="¿Qué tipo de película buscas?"
            className="w-full"
          />
          <button
            className={cx(
              semanticSearch.length > 0 ? "opacty-100" : "opacity-0",
              "m-1",
              "px-3",
              "flex",
              "flex-row",
              "gap-2",
              "py-1",
              "bg-blue-600",
              "hover:bg-blue-700",
              "text-white",
              "rounded",
              "mr-10"
            )}
            onClick={closeSemanticSearch}
          >
            <Search />
            Busca
          </button>
        </div>
        <CommandSeparator />
        <CommandList></CommandList>

        {results.length === 0 && (
          <div className="px-4 py-2">
            <h1 className="text-xs text-gray-600 py-1">
              Sugerencias de búsqueda
            </h1>
            <ul className="list-none">
              <li className="cursor-pointer flex gap-2 items-center py-1 hover:bg-gray-100">
                <FaGun />
                <span
                  onClick={() =>
                    submitSemanticSearch("Thriller policial de los años 90")
                  }
                >
                  &quot;Thriller policial de los años 90&quot;
                </span>
              </li>
              <li className="cursor-pointer flex gap-2 items-center py-1 hover:bg-gray-100">
                <FaRegLaughBeam />
                <span
                  onClick={() =>
                    submitSemanticSearch(
                      "Comedia romántica similar a Pretty Woman"
                    )
                  }
                >
                  &quot;Comedia romántica similar a Pretty Woman&quot;
                </span>
              </li>
              <li className="cursor-pointer flex gap-2 items-center py-1 hover:bg-gray-100">
                <FaHatCowboySide />
                <span
                  onClick={() =>
                    submitSemanticSearch("Una peli clásica de vaqueros")
                  }
                >
                  &quot;Una peli clásica de vaqueros&quot;
                </span>
              </li>
            </ul>
          </div>
        )}
        {results.length > 0 && (
          <div className="px-4 py-2">
            <h1 className="text-xs text-gray-600 py-1">Resultados directos</h1>
            <ul className="list-none">
              {results.map((movie) => (
                <li key={movie.id}>
                  <Link
                    onClick={closeSemanticSearch}
                    className="cursor-pointer flex gap-2 items-center py-1 hover:bg-gray-100"
                    href={`/peli/${movie.title_slug}?embedding=${embedding}`}
                  >
                    <RiMovie2Line />
                    <span>{movie.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CommandDialog>
    </div>
  );
};

export default SemanticSearch;
