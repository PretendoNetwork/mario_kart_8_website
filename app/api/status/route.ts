import app_config from "@/app.config";
import { amkj_grpc_client } from "@/helpers/grpc";
import { GetServerStatusResponse } from "@/helpers/proto/amkj_service";
import { NextResponse } from "next/server";
import { Metadata } from "nice-grpc";

var status: GetServerStatusResponse | null = null;
var lastStatusTime: Date = new Date();

export async function GET(request: Request) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

    try {
        if (!status || ((new Date().getTime() - lastStatusTime.getTime()) > 5000)) {
            status = await amkj_grpc_client.getServerStatus({}, {
                metadata: Metadata({
                    "X-API-Key": app_config.grpc_api_key
                })
            });
            lastStatusTime = new Date();
        }
        return NextResponse.json(status);
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}