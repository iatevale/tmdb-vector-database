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
import { FiltersSchema } from "@/lib/utils";

const SemanticSearch = ({
  form,
  handleFormSubmit,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof FiltersSchema>>>;
  handleFormSubmit: (event: React.KeyboardEvent) => void;
}) => {
  return (
    <div className="mt-4 w-full flex-1 px-4 flex flex-col justify-end relative relative">
      <FormField
        control={form.control}
        name="semanticSearch"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Búsqueda semántica..."
                className="resize-none min-h-40 flex-1 bg-gray-50"
                onKeyDown={handleFormSubmit}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="absolute bottom-2 right-6">
        Enviar
      </Button>
    </div>
  );
};

export default SemanticSearch;
