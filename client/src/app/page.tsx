import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";

const Movies = async () => {
  return (
    <main className="flex-1 flex flex-col items-start md:flex-row">
      <Sidebar className="w-full md:w-1/4" />
      <MovieList className="w-full md:w-3/4" />
    </main>
  );
};

export default Movies;
