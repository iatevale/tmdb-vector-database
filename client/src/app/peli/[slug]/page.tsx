import React from "react";
import Image from "next/image";
import { format } from "date-fns";

const fetchMovie = async (slug: string) => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${slug}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

const Movie = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const movie = await fetchMovie(slug);

  return (
    <div className="flex relative">
      <Image
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
        fill={true}
        priority
        className="opacity-20 absolute top-2 left-2 right-2"
      />
      <div className="bg-white z-10 border-lg border-gray-100 dark:border-gray-600 rounded-lg p-4">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie.title}
          width={400}
          height={600}
          priority
          className="rounded-[20px] border border-gray-100 dark:border-gray-600"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">
          {movie.title} ({format(movie.release_date, "yyyy")})
        </h1>
        <h2 className="text-sm">{movie.original_title}</h2>
      </div>
    </div>
  );
};

export default Movie;
