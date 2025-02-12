import MovieList from "@/components/movie-list";
import Sidebar from "@/components/sidebar";
import { Suspense } from "react";

const Movies = async () => {
  return (
    <main className="flex-1 flex flex-col items-start lg:flex-row gap-4">
      <Sidebar />
      <Suspense>
        <MovieList />
      </Suspense>
    </main>
  );
};

export default Movies;
