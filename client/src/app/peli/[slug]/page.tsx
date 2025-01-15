import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { MovieType } from "@/types";
import Link from "next/link";

const fetchMovie = async (slug: string) => {
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
  const movie: MovieType = await fetchMovie(slug);

  return (
    <div className="flex flex-col px-8">
      <div className="flex items-start relative w-full">
        <div className="relative bg-white z-10 border-lg border-gray-100 dark:border-gray-600 rounded-lg p-4">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            priority
            className="rounded-[20px] border border-gray-100 dark:border-gray-600"
          />
        </div>

        <div className="flex flex-col items-start w-3/4 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={movie.vote_average * 10}
              gaugePrimaryColor="rgb(79 70 229)"
              gaugeSecondaryColor="rgba(255, 255, 255, 1)"
              className="w-16 h-16 rounded-xl opacity-80"
            />

            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                {movie.title} ({format(movie.release_date, "yyyy")})
              </h1>
              <h2 className="text-sm">
                {movie.original_title} | {movie.genres.join(", ")}
              </h2>
            </div>
          </div>
          <p className="max-w-100 text-justify">{movie.overview}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-col items-center w-full">
        <h2 className="text-xl font-bold border-b w-full text-center">
          Relacionadas
        </h2>
        <div className="flex gap-2 justify-center w-full">
          {movie.related?.map((related) => (
            <div key={related.id} className="flex items-center gap-2">
              <Link href={`/peli/${related.title_slug}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w1280${related.poster_path}`}
                  alt={related.title}
                  width={100}
                  height={150}
                  priority
                  className="rounded-[20px] border border-gray-100 dark:border-gray-600"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
