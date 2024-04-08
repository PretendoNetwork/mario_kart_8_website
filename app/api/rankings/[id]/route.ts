import app_config from "@/app.config";
import { amkj_grpc_client } from "@/helpers/grpc";
import { type NextRequest } from 'next/server'
import { NextResponse } from "next/server";
import { Metadata } from "nice-grpc";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

    try {
        const trackId = parseInt(params.id);
        if (isNaN(trackId)) {
            throw new Error("Invalid track ID");
        }
        const searchParams = request.nextUrl.searchParams;
        let ascFilter = true;
        if (searchParams.has("desc")) {
            ascFilter = false;
        }

        const response = await amkj_grpc_client.getTimeTrialRanking({ track: trackId, limit: 10, asc: ascFilter }, {
            metadata: Metadata({
                "X-API-Key": app_config.grpc_api_key
            })
        });


        return NextResponse.json(response, { status: 200 });
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}