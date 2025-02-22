import React from "react";
import Image from "next/legacy/image";
import { format } from "date-fns";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { MovieType } from "@/types";
import RelatedMovieCard from "@/components/related-movie-card";
import { SiWikipedia } from "react-icons/si";

const fetchMovie = async (slug: string, embedding: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/detail/?slug=${slug}&embedding=${embedding}`,
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

const Movie = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { embedding } = await searchParams;
  const movie: MovieType = await fetchMovie(slug, embedding as string);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center md:items-start relative w-full">
        <div className="relative z-10 border-lg border-gray-100 dark:border-gray-600 rounded-lg p-4">
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
          <div className="flex items-center gap-6 mb-4">
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
          <p className="my-4 border-t border-gray-100 pt-2">
            <a
              target="_blank"
              className="flex items-center gap-2 hover:text-orange-700"
              href={movie.wikipedia_url_es}
            >
              <SiWikipedia size={32} />
              {decodeURIComponent(movie.wikipedia_url_es)}
            </a>
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-col items-center w-full mt-4">
        <h2 className="text-xl font-bold border-b w-full text-center">
          Relacionadas
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-10 gap-2 justify-center items-start w-full">
          {movie.related?.map((related) => (
            <RelatedMovieCard key={related.id} movie={related} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
