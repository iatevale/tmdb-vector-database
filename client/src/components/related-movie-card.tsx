"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MovieType } from "@/types";
import { Progress } from "./ui/progress";
import { EmbeddingProviderContext } from "@/contexts/embedding";

const RelatedMovieCard = ({ movie }: { movie: MovieType }) => {
  const { embedding } = React.useContext(EmbeddingProviderContext);

  return (
    <div className="flex flex-col items-center justify-end gap-1 text-xs">
      <motion.div
        className="rounded-[12px] overflow-hidden shadow-md cursor-pointer border border-gray-100 dark:border-gray-600"
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.25)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link href={`/peli/${movie.title_slug}?embedding=${embedding}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={150}
            priority
            className="min-h-24"
          />
        </Link>
      </motion.div>
      <Progress value={movie.proximidad} />
      <div className="text-xs">{movie.proximidad}%</div>
    </div>
  );
};

export default RelatedMovieCard;
