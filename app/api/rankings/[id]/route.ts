import { amkjGrpcClientWithToken } from "@/helpers/grpc";
import { type NextRequest } from 'next/server'
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, ctx: RouteContext<'/api/rankings/[id]'>) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers
    const { id } = await ctx.params;

    try {
        const trackId = parseInt(id);
        if (isNaN(trackId)) {
            throw new Error("Invalid track ID");
        }
        const searchParams = request.nextUrl.searchParams;
        let ascFilter = true;
        if (searchParams.has("desc")) {
            ascFilter = false;
        }

        const response = await amkjGrpcClientWithToken.getTimeTrialRanking({ track: trackId, limit: 10, asc: ascFilter });


        return NextResponse.json(response, { status: 200 });
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}