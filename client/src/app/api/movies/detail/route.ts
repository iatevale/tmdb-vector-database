"use server";

import { NextResponse } from 'next/server';

import { prisma } from "@/lib/prisma";
import { MovieType } from '@/types';

import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const embedding = searchParams.get('embedding');

    const movie = await prisma.movie.findFirst({
        where: {
            title_slug: slug
        }
    });

    if (!movie) {
        return NextResponse.json({ status: 404 });
    }

    // https://ollama.com/blog/embedding-models
    let related: MovieType[] = [];
    if (movie) {
        if (embedding === 'deepseek') {
            related = await prisma.$queryRaw`
            WITH Distancias AS (
            select * from (SELECT id, title, poster_path, title_slug, 
                    "deepseek_embeddings" <=> (
                    SELECT "deepseek_embeddings" 
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
                ROUND(CAST((1 - (d.distancia - r.min_dist) / NULLIF((r.max_dist - r.min_dist), 0)) * 100 AS numeric), 2) AS proximidad
            FROM Distancias d, Rango r
            ORDER BY d.distancia
            LIMIT 10;
        `;
        } else if (embedding === "openai") {
            related = await prisma.$queryRaw`
            WITH Distancias AS (
            select * from (SELECT id, title, poster_path, title_slug, 
                    "openai_embeddings" <=> (
                    SELECT "openai_embeddings" 
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
                ROUND(CAST((1 - (d.distancia - r.min_dist) / NULLIF((r.max_dist - r.min_dist), 0)) * 100 AS numeric), 2) AS proximidad
            FROM Distancias d, Rango r
            ORDER BY d.distancia
            LIMIT 10;
        `;
        } else if (embedding === 'ollama') {
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
                        ROUND(CAST((1 - (d.distancia - r.min_dist) / NULLIF((r.max_dist - r.min_dist), 0)) * 100 AS numeric), 2) AS proximidad
                    FROM Distancias d, Rango r
                    ORDER BY d.distancia
                    LIMIT 10;
                `;

        }
    }

    return NextResponse.json({ ...movie, related });

}