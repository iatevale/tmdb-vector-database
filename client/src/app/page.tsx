import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import UpdateQueryParams from "@/components/update-query-params";
import { FiltersSchema, QueryParamsFiltersSchema } from "@/lib/utils";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const filters = QueryParamsFiltersSchema.parse(params);
  return (
    <main className="flex-1 flex flex-col items-start md:flex-row">
      <Sidebar filters={filters} className="w-full md:w-1/4" />
      <MovieList className="w-full md:w-3/4" />
      <UpdateQueryParams />
      <Toaster />
    </main>
  );
};

export default Home;
