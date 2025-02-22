"use server";

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { NextRequest } from 'next/server';

type MinimalMovie = {
    id: number;
    title: string;
    poster_path: string;
    title_slug: string;
}

export const POST = async (req: NextRequest) => {
    const { query: semanticSearch } = await req.json()

    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            input: semanticSearch,
            model: 'text-embedding-3-large'
        })
    });

    const data = await response.json();

    const embedding = data.data[0].embedding;

    // https://ollama.com/blog/embedding-models
    const nearest: MinimalMovie[] = await prisma.$queryRaw`
        SELECT m.id, m.title, m.poster_path, m.title_slug
        FROM "Movie" m
        ORDER BY openai_embeddings <-> ${embedding}::vector
        LIMIT 1;
    `;

    return NextResponse.json({ movie: nearest[0] });

}