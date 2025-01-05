"use client";

import { cx } from "class-variance-authority";
import React from "react";
import { Separator } from "./ui/separator";
import MovieSorter from "./movie-sorter";
import DecadeSlider from "./decade-slider";
import ScoreSlider from "./score-slider";
import { Paintbrush } from "lucide-react";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { FiltersSchema } from "@/lib/utils";
import SemanticSearch from "./semantic-search";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const Sidebar = ({
  filters,
  className,
}: {
  filters: z.infer<typeof FiltersSchema>;
  className: string;
}) => {
  const { form, movieFilters, setMovieFilters } =
    React.useContext(MovieProviderContext);
  const ref = React.useRef<HTMLFormElement>(null!);

  React.useEffect(() => {
    setMovieFilters(filters);
  }, [filters]);

  const handleReset = () => {
    setMovieFilters(FiltersSchema.parse({}));
  };

  const onSubmit = (data: z.infer<typeof FiltersSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset({ semanticSearch: "" });
  };

  const handleDecadeValuesChange = (values: number[]) => {
    setMovieFilters(
      Object.assign({}, movieFilters, {
        page: 1,
        decadeMin: values[0],
        decadeMax: values[1],
      })
    );
  };

  const handleScoreValuesChange = (values: number[]) => {
    setMovieFilters(
      Object.assign({}, movieFilters, {
        page: 1,
        scoreMin: values[0],
        scoreMax: values[1],
      })
    );
  };

  return (
    <aside
      className={cx(
        "flex",
        "flex-col",
        "justify-start",
        "items-center",
        "rounded-lg",
        "px-4",
        "py-2",
        "dark:bg-gray-900",
        "min-h-[calc(100vh-9rem)]",
        className
      )}
    >
      <Form {...form}>
        <form ref={ref} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center w-full pt-3 px-4">
            <h1 className="text-xl flex-1 text-gray-600 dark:text-white">
              Filtros
            </h1>
            <Paintbrush
              onClick={handleReset}
              className="h-4 w-4 cursor-pointer hover:text-orange-700"
            />
          </div>
          <Separator />
          <div className="mt-2 flex flex-col gap-4 items-center px-4">
            <MovieSorter />
            <DecadeSlider
              setDecade={handleDecadeValuesChange}
              range={[movieFilters.decadeMin, movieFilters.decadeMax]}
            />
            <ScoreSlider
              setScore={handleScoreValuesChange}
              range={[movieFilters.scoreMin, movieFilters.scoreMax]}
            />
          </div>
          <SemanticSearch onSubmit={onSubmit} form={form} formRef={ref} />
        </form>
      </Form>
    </aside>
  );
};

export default Sidebar;
