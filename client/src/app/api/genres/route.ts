"use server";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";


type GenreType = {
    genre: string;
}

export const GET = async (
    req: NextRequest,
) => {
    const genres: GenreType[] = await prisma.$queryRaw`SELECT DISTINCT UNNEST(genres) AS genre FROM "Movie";`;

    return NextResponse.json({
        genres: genres.map((g: { genre: string }) => ({
            value: g.genre,
            label: g.genre
        })),
        status: "success"
    });
}