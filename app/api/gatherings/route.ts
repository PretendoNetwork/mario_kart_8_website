import app_config from "@/app.config";
import { amkj_grpc_client } from "@/helpers/grpc";
import { GetAllGatheringsResponse } from "@/helpers/proto/amkj_service";
import { NextResponse } from "next/server";
import { Metadata } from "nice-grpc";

var allGatherings: GetAllGatheringsResponse | null = null;
var lastAllGatheringsTime: Date = new Date();

export async function GET(request: Request) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

    try {
        if (!allGatherings || ((new Date().getTime() - lastAllGatheringsTime.getTime()) > 5000)) {
            allGatherings = await amkj_grpc_client.getAllGatherings({ offset: 0, limit: -1 }, {
                metadata: Metadata({
                    "X-API-Key": app_config.grpc_api_key
                })
            });
            lastAllGatheringsTime = new Date();
        }
        return NextResponse.json(allGatherings);
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}