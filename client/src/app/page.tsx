import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page } = await searchParams;
  return (
    <main className="flex-1 flex flex-col md:flex-row gap-8">
      <Sidebar />
      <div className="flex flex-col pt-4 w-full px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="mb-2">
            <PaginationWithLinks
              page={parseInt((page ?? "1") as string)}
              pageSize={20}
              totalCount={500}
            />
          </div>
        </div>
        <MovieList page={parseInt((page ?? "1") as string)} />
      </div>
    </main>
  );
};

export default Home;
