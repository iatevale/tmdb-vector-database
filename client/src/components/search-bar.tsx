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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsFocused((isFocused) => !isFocused);
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
        />
        {isFocused && (
          <CommandList className="bg-white border border-gray-100 absolute w-full top-[calc(100%-2px)] left-0 z-10">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
