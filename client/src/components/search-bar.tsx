"use client";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cx } from "class-variance-authority";

const SearchBar = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (ref.current) {
          setTimeout(() => {
            ref?.current?.focus();
          }, 50);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Command className="max-w-96 relative overflow-visible">
        <p className="absolute top-3 right-1 text-sm text-muted-foreground">
          <kbd
            className={cx(
              "pointer-events-none",
              "inline-flex",
              "h-5",
              "select-none",
              "items-center",
              "gap-1",
              "rounded",
              "border",
              "bg-muted",
              "px-1.5",
              "font-mono",
              "text-[10px]",
              "font-medium",
              "text-muted-foreground",
              "opacity-100"
            )}
          >
            <span className="text-xs">⌘</span>B
          </kbd>
        </p>

        <CommandInput
          onFocus={handleOnFocus}
          onBlur={handleBlur}
          placeholder="Busca una película por título..."
          ref={ref}
        />
        {isFocused && (
          <CommandList className="bg-white border border-gray-100 absolute w-full top-[calc(100%-2px)] left-0 z-10">
            <CommandEmpty>No se han encontrado películas.</CommandEmpty>
            <CommandGroup heading="Sugerencias">
              <CommandItem className="cursor-pointer">Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
