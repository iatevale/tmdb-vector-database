"use server";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { addYears } from "date-fns";
import { MiniMovieType, MovieResultsType, MovieType } from '@/types';

type WhereType = {
    vote_average?: {
        gte: number;
        lte: number;
    },
    release_date?: {
        gte: Date;
        lte: Date;
    },
    genres?: {
        hasEvery?: string[];
    },
    title?: {
        contains: string;
        mode?: "insensitive";
    },
    id?: {
        in: number[];
    }
}

const take = 16;
// DOC: https://github.com/milvus-io/milvus-sdk-node
// DOC: https://milvus.io/api-reference/node/v2.5.x/About.md
export const GET = async (
    req: NextRequest,
) => {
    const searchParams = req.nextUrl.searchParams;
    const where: WhereType = {}

    if (searchParams.get("genres")) {
        where["genres"] = {
            hasEvery: searchParams.get("genres")?.split(",") || [],
        }
    }

    if (searchParams.get("scoreMin") && searchParams.get("scoreMax")) {
        where["vote_average"] = {
            gte: parseFloat(searchParams.get("scoreMin") as string ?? "0"),
            lte: parseFloat(searchParams.get("scoreMax") as string ?? "10")
        }
    }

    if (searchParams.get("decadeMin") && searchParams.get("decadeMax")) {
        where["release_date"] = {
            gte: new Date(searchParams.get("decadeMin") as string ?? ""),
            lte: addYears(new Date(searchParams.get("decadeMax") as string ?? ""), 10)
        }
    }

    if (searchParams.get("search")) {
        where["title"] = {
            contains: searchParams.get("search") as string ?? "",
            mode: "insensitive"
        }
    }

    if (searchParams.get("semanticSearch")) {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_OLLAMA_EMBEDDINGS_SERVER}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "mxbai-embed-large",
                    prompt: searchParams.get("semanticSearch"),
                }),
            }
        );
        const data = await response.json();
        const embeddings = `[${data.embedding.join(',')}]`;

        type MovieDistanceType = {
            id: number;
            distancia: number;
        }

        const r: MovieDistanceType[] = await prisma.$queryRawUnsafe(`
            SELECT id,
                   (ollama_embeddings <-> '${embeddings}'::vector) AS distancia
            FROM "Movie"
            ORDER BY distancia ASC
            LIMIT 100;
        `);

        where["id"] = {
            in: r.map((movie: MovieDistanceType) => movie.id)
        }
    }
    const query = {
        select: {
            id: true,
            title: true,
            poster_path: true,
            title_slug: true,
            release_date: true,
            vote_average: true,
            genres: true,
        },
        take,
        skip: ((Number(searchParams.get("page") as string) || 1) - 1) * take,
        orderBy: {
            [searchParams.get("orderBy") as string || "release_date"]: searchParams.get("orderDirection") as string ?? "desc",
        },
        where
    }

    const total = await prisma.movie.count({ where });
    const movies = await prisma.movie.findMany(query);

    return NextResponse.json({
        total,
        movies,
        status: "success"
    });
}