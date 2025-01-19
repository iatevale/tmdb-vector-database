"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { toast } from "@/hooks/use-toast";
import { CircleArrowRight, Loader2 } from "lucide-react";
import { cx } from "class-variance-authority";
import { on } from "events";

const SemanticSearch = ({}: {}) => {
  const { form, onFormSubmit } = React.useContext(MovieProviderContext);
  const [loading, setLoading] = React.useState(false);

  const handleSemanticSearch = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OLLAMA_EMBEDDINGS_SERVER}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mxbai-embed-large",
          prompt: form.getValues("semanticSearch"),
        }),
      }
    );
    const data = await response.json();
    toast({
      title: "Embeddings",
      description: (
        <div className="flex items-center space-x-2 color-black">
          <div>{data.embedding.length}</div>
        </div>
      ),
    });

    const r = await fetch(`/api/movies/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeddings: data.embedding,
      }),
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

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
        className={cx("absolute", "bottom-2", "right-6")}
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
