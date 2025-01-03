import { cx } from "class-variance-authority";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ChevronsUpDown,
} from "lucide-react";
import { DropdownMenuIcon } from "@radix-ui/react-icons";

const Sidebar = () => {
  return (
    <aside
      className={cx(
        "flex",
        "flex-col",
        "justify-start",
        "rounded-lg",
        "px-4",
        "py-1",
        "dark:bg-gray-900",
        "mt-6",
        "ml-2"
      )}
    >
      <h1 className="text-xl text-gray-600 dark:text-white text-center pt-3">
        Filtros
      </h1>
      <Separator />
      <div className="mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-12">
              <div className="flex justify-between gap-4 items-center w-full py-2">
                <ArrowUpAZ className="w-6 h-6" />
                <div className="flex flex-col items-start">
                  <h2>Ordenación</h2>
                  <p className="text-xs font-light">Alfabética</p>
                </div>
                <ChevronsUpDown />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Ordenación</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Alfabética ascendente
              <div className="ml-auto">
                <ArrowUpAZ className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Alfabética descendente
              <div className="ml-auto">
                <ArrowDownAZ className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Por nota ascendente
              <div className="ml-auto">
                <ArrowDown01 className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Por nota descendente
              <div className="ml-auto">
                <ArrowDown10 className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Por fecha de estreno ascendente
              <div className="ml-auto">
                <ArrowDownNarrowWide className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Por fecha de estreno descendente
              <div className="ml-auto">
                <ArrowDownWideNarrow className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
