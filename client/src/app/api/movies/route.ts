"use server";
import { milvus } from "@/lib/milvus";
import { MovieResponseData } from "@/types";
import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "@/lib/prisma";
import { skip } from "node:test";

// DOC: https://github.com/milvus-io/milvus-sdk-node
// DOC: https://milvus.io/api-reference/node/v2.5.x/About.md
export const GET = async (
    req: NextApiRequest,
    res: NextApiResponse<MovieResponseData>
) => {
    const { searchParams } = new URL(req.url ?? "");
    const page = parseInt(searchParams?.get("page") ?? "1")

    const result = await prisma.movie.findMany({
        take: 12,
        skip: (page - 1) * 12,
    });

    return NextResponse.json(result);

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