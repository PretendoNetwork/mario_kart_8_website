import { amkjGrpcClientWithToken } from "@/helpers/grpc";
import { GetServerStatusResponse } from "@/helpers/proto/generated/amkj_service";
import { NextResponse } from "next/server";

var status: GetServerStatusResponse | null = null;
var lastStatusTime: Date = new Date();

export async function GET(request: Request) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

    try {
        if (!status || ((new Date().getTime() - lastStatusTime.getTime()) > 5000)) {
            status = await amkjGrpcClientWithToken.getServerStatus({});
            lastStatusTime = new Date();
        }
        return NextResponse.json(status);
    } catch (err) {
        console.error(err);
        return new NextResponse("{}", { status: 500 });
    }
}