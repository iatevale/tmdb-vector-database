import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";
import UpdateQueryParams from "@/components/update-query-params";
import { defaultfilters } from "@/lib/utils";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const {
    page = defaultfilters.page,
    decadeMin = defaultfilters.decadeMin,
    decadeMax = defaultfilters.decadeMax,
    voteAverageMax = defaultfilters.voteAverageMax,
    voteAverageMin = defaultfilters.voteAverageMin,
  } = (await searchParams) || {};

  return (
    <main className="flex-1 flex flex-col md:flex-row gap-8">
      <Sidebar
        page={parseInt(page as string)}
        decadeMin={parseInt(decadeMin as string)}
        decadeMax={parseInt(decadeMax as string)}
        voteAverageMax={parseFloat(voteAverageMax as string)}
        voteAverageMin={parseFloat(voteAverageMin as string)}
      />
      <MovieList />
      <UpdateQueryParams />
    </main>
  );
};

export default Home;
