"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
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
  formRef,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof FiltersSchema>>>;
  formRef: React.RefObject<HTMLFormElement> | null;
  onSubmit: (data: z.infer<typeof FiltersSchema>) => void;
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (formRef?.current) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

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
                onKeyDown={handleKeyDown}
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
