"use client";
import { MovieProviderContext } from "@/contexts/movie-list-props";
import isEqual from "lodash.isequal";
import { FiltersSchema } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";

const UpdateQueryParams = () => {
  const { form } = React.useContext(MovieProviderContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const watchValues = form.watch();

  React.useEffect(() => {
    if (
      isEqual(
        watchValues,
        Object.fromEntries(searchParams) as unknown as z.infer<
          typeof FiltersSchema
        >
      )
    )
      return;

    // if (Object.keys(Object.fromEntries(searchParams)).length > 0) return;

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
  }, [searchParams, watchValues]);
  return null;
};

export default UpdateQueryParams;
