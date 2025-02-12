"use server";

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";


type GenreType = {
    genre: string;
}

export const GET = async (
) => {
    const genres: GenreType[] = await prisma.$queryRaw`SELECT DISTINCT UNNEST(genres) AS genre FROM "Movie" order by UNNESt(genres);`;

    return NextResponse.json({
        genres: genres.map((g: { genre: string }) => ({
            value: g.genre,
            label: g.genre
        })),
        status: "success"
    });
}