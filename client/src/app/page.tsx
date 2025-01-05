import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";
import UpdateQueryParams from "@/components/update-query-params";
import { defaultFilters } from "@/lib/utils";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const {
    page = defaultFilters.page,
    decadeMin = defaultFilters.decadeMin,
    decadeMax = defaultFilters.decadeMax,
    scoreMax = defaultFilters.scoreMax,
    scoreMin = defaultFilters.scoreMin,
  } = (await searchParams) || {};

  return (
    <main className="flex-1 flex flex-col items-start md:flex-row">
      <Sidebar
        page={parseInt(page as string)}
        decadeMin={parseInt(decadeMin as string)}
        decadeMax={parseInt(decadeMax as string)}
        scoreMax={parseFloat(scoreMax as string)}
        scoreMin={parseFloat(scoreMin as string)}
        className="w-full md:w-1/4"
      />
      <MovieList className="w-full md:w-3/4" />
      <UpdateQueryParams />
    </main>
  );
};

export default Home;
