"use server";

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import slugify from 'slugify';

export const DELETE = async (req: NextRequest) => {
    const session = await auth()
    if (!session?.user?.email || session?.user?.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    const movie = await prisma.movie.findFirst({
        where: {
            title_slug: slug
        }
    });

    if (!movie) {
        return NextResponse.json({ status: 404 });
    }

    const result = await prisma.movie.delete({
        where: {
            id: movie.id
        }
    });

    return NextResponse.json({ ...result });

}

export const POST = async (req: NextRequest) => {
    const session = await auth()
    if (!session?.user?.email || session?.user?.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const tmdb_api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=es-ES`

    const response = await fetch(tmdb_api_url);
    const data = await response.json();

    const movieData = {
        id: parseInt(data.id),
        imdb_id: data.imdb_id,
        backdrop_path: data.backdrop_path,
        budget: parseFloat(data.budget),
        original_title: data.original_title,
        original_title_slug: slugify(data.original_title),
        overview: data.overview,
        popularity: parseFloat(data.popularity),
        poster_path: data.poster_path,
        release_date: new Date(Date.parse(data.release_date)),
        revenue: parseFloat(data.revenue),
        runtime: parseInt(data.runtime),
        status: data.status,
        tagline: data.tagline,
        title: data.title,
        title_slug: slugify(data.title),
        vote_average: parseFloat(data.vote_average),
        vote_count: parseInt(data.vote_count),
        spoken_languages: data.spoken_languages.map((lang: { iso_639_1: string }) => lang.iso_639_1).join(","),
        genres: data.genres.map((genre: { name: string }) => genre.name)
    };

    try {
        const movie = await prisma.movie.create({
            data: movieData,
        });
        return NextResponse.json({ status: 200, movie });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, error });
    }

}