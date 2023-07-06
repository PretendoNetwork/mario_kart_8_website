import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTTokenPayload, getMK8TokenEx } from "@/helpers/types/JWTTokenPayload";
import { amkj_grpc_client } from "@/helpers/grpc";
import { Metadata } from "nice-grpc";
import app_config from "@/app.config";

export async function POST(request: Request) {
    try {
        const cookieStore = cookies();
        const mk8_token = cookieStore.get("mk8_token");
        if (!mk8_token) {
            return new NextResponse("{}", { status: 401 });
        }

        const token: JWTTokenPayload | null = await getMK8TokenEx(mk8_token.value);
        if (!token) {
            return new NextResponse("{}", { status: 401 });
        }

        const input = await request.json();

        const startDate = new Date();
        const endDate = new Date();

        startDate.setTime(input.startTime);
        endDate.setTime(input.endTime);

        const res = await amkj_grpc_client.startMaintenance({
            utcStartMaintenanceTime: startDate,
            utcEndMaintenanceTime: endDate
        }, {
            metadata: Metadata({
                "X-API-Key": app_config.grpc_api_key
            })
        });

        return NextResponse.json(res);

    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}