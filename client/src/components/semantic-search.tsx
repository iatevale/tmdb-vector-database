"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { CircleArrowRight, Loader2 } from "lucide-react";
import { cx } from "class-variance-authority";

const SemanticSearch = () => {
  const { form, onFormSubmit } = React.useContext(MovieProviderContext);
  const [loading] = React.useState(false);

  return (
    <div className="mt-2 w-full flex-1 flex flex-col justify-end relative relative">
      <FormField
        control={form.control}
        name="semanticSearch"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Búsqueda semántica..."
                className="resize-none min-h-40 flex-1 bg-gray-50 dark:bg-gray-600"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={() => form.handleSubmit(onFormSubmit)()}
        disabled={loading}
        className={cx("absolute", "bottom-2", "right-2")}
      >
        Enviar
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <CircleArrowRight className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default SemanticSearch;
