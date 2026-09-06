import { amkjGrpcClientWithToken } from "@/helpers/grpc";
import { GetAllGatheringsResponse } from "@/helpers/proto/generated/amkj_service";
import { NextResponse } from "next/server";

var allGatherings: GetAllGatheringsResponse | null = null;
var lastAllGatheringsTime: Date = new Date();

export async function GET(request: Request) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

    try {
        if (!allGatherings || ((new Date().getTime() - lastAllGatheringsTime.getTime()) > 5000)) {
            allGatherings = await amkjGrpcClientWithToken.getAllGatherings({ offset: 0, limit: -1 });
            lastAllGatheringsTime = new Date();
        }
        return NextResponse.json(allGatherings);
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}