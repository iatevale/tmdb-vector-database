import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";

const Movies = async () => {
  return (
    <main className="flex-1 flex flex-col items-start lg:flex-row gap-4">
      <Sidebar />
      <MovieList />
    </main>
  );
};

export default Movies;
