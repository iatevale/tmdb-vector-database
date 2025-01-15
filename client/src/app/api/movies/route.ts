"use server";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { addYears } from "date-fns";

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

    const query = {
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