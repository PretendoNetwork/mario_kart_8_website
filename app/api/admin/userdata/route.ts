import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTTokenPayload, getMK8TokenEx } from "@/helpers/types/JWTTokenPayload";
import { amkj_grpc_client } from "@/helpers/grpc";
import { Metadata } from "nice-grpc";
import app_config from "@/app.config";

export async function GET(request: Request) {
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

        const userData = await amkj_grpc_client.getUnlocks({ pid: token.pid }, {
            metadata: Metadata({
                "X-API-Key": app_config.grpc_api_key
            })
        });

        return NextResponse.json(userData);
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}