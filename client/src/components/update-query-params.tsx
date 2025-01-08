"use client";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import { FiltersSchema } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { use } from "react";
import { z } from "zod";

const UpdateQueryParams = () => {
  const { form } = React.useContext(MovieProviderContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const same = (
    obj1: z.infer<typeof FiltersSchema>,
    obj2: z.infer<typeof FiltersSchema>
  ) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1
      .filter((k) => k !== "page")
      .every(
        (key) =>
          obj2.hasOwnProperty(key as keyof z.infer<typeof FiltersSchema>) &&
          obj1[key as keyof z.infer<typeof FiltersSchema>] ==
            obj2[key as keyof z.infer<typeof FiltersSchema>]
      );
  };

  React.useEffect(() => {
    if (
      same(
        form.getValues(),
        Object.fromEntries(searchParams) as unknown as z.infer<
          typeof FiltersSchema
        >
      )
    )
      return;

    const stringParams = Object.assign(
      Object.fromEntries(
        Object.entries(form.getValues()).map(([key, value]) => [
          key,
          String(value),
        ])
      ),
      { page: searchParams.get("page") ?? "1" }
    );
    const params = new URLSearchParams(stringParams);

    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, form.getValues()]);
  return null;
};

export default UpdateQueryParams;
