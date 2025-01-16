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
            WITH Distancias AS (
            select * from (SELECT id, title, poster_path, title_slug, 
                    "ollama_embeddings" <=> (
                    SELECT "ollama_embeddings" 
                    FROM "Movie" 
                    WHERE id = ${movie.id}
                    ) AS distancia
            FROM "Movie"
            WHERE id != ${movie.id}
            ) where distancia < 0.3),
            Rango AS (
            SELECT MIN(distancia) AS min_dist, MAX(distancia) AS max_dist
            FROM Distancias
            )
            SELECT d.id, d.title, d.poster_path, d.title_slug, d.distancia,
                ROUND(CAST((1 - (d.distancia - 0.15) / NULLIF((r.max_dist - 0.15), 0)) * 100 AS numeric), 2) AS proximidad
            FROM Distancias d, Rango r
            ORDER BY d.distancia
            LIMIT 10;
        `;
    }

    return NextResponse.json({ ...movie, related });

}