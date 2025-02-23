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

    const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                {
                    "role": "system",
                    "content": "Te pasaré una consulta sobre una recomendación de película y me responderás únicamente con el nombre de la película, el género de la película, el nombre del director y el nombre de los actores principales. De la forma más concisa posible."
                },
                {
                    "role": "user",
                    "content": semanticSearch
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    const d = await r.json();
    const e = d.choices[0].message.content;

    console.log(e);

    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            input: e,
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