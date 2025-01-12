"use server";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export const GET = async (
    req: NextRequest, { params }: { params: { slug: string } }
) => {
    const movie = await prisma.movie.findFirst({
        where: {
            title_slug: params.slug
        }
    });

    return NextResponse.json(movie);

}