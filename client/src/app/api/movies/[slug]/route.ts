"use server";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { MovieType } from '@/types';

export const GET = async (
    req: NextRequest, { params }: { params: { slug: string } }
) => {
    const { slug } = await params;
    const movie = await prisma.movie.findFirst({
        where: {
            title_slug: slug
        }
    });

    let related: MovieType[] = [];
    if (movie) {
        related = await prisma.$queryRaw`
        SELECT id, title, poster_path, title_slug, "ollama_embeddings" <=> (
          SELECT "ollama_embeddings" 
          FROM "Movie" 
          WHERE id = ${movie.id}
        ) AS distancia
        FROM "Movie"
        WHERE id != ${movie.id}
        ORDER BY distancia
        LIMIT 10;
      `;
    }

    return NextResponse.json({ ...movie, related });

}