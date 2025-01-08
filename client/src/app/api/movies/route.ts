"use server";

import { MovieResponseData } from "@/types";
import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "@/lib/prisma";

type WhereType = {
    vote_average?: {
        gte: number;
        lte: number;
    },
    release_date?: {
        gte: Date;
        lte: Date;
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
    req: NextApiRequest,
    res: NextApiResponse<MovieResponseData>
) => {
    const { searchParams } = new URL(req.url as string, `http://${req.headers.host}`);
    const page = parseInt(searchParams?.get("page") ?? "1")
    const where: WhereType = {}

    if (searchParams?.get("scoreMin") && searchParams?.get("scoreMax")) {
        where["vote_average"] = {
            gte: parseFloat(searchParams.get("scoreMin") ?? "0"),
            lte: parseFloat(searchParams.get("scoreMax") ?? "10")
        }
    }

    if (searchParams?.get("decadeMin") && searchParams?.get("decadeMax")) {
        where["release_date"] = {
            gte: new Date(searchParams.get("decadeMin") ?? ""),
            lte: new Date(searchParams.get("decadeMax") ?? "")
        }
    }

    console.log("hola", req.url, searchParams);
    if (searchParams?.get("search")) {
        where["title"] = {
            contains: searchParams.get("search") ?? "",
            mode: "insensitive"
        }
    }

    const query = {
        take,
        skip: (page - 1) * take,
        orderBy: {
            [searchParams?.get("orderBy") || "release_date"]: searchParams?.get("orderDirection") ?? "desc",
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

    /*try {
        await milvus.init();
        const result: MovieResponseData = await milvus.query({
            collection_name: "movies",
            output_fields: ["id", "title", "runtime", "poster_path", "release_date", "vote_average"],
            expr: "runtime > 150",
            limit: 12,
            offset: (page - 1) * 12,
        });
        return NextResponse.json(result.data);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }*/
}