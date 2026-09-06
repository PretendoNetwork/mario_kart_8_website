import { NextResponse } from "next/server";
import { buildUserdataFromGrpc, JWTTokenPayload } from "@/helpers/types/JWTTokenPayload";
import app_config from "@/app.config";

// Get a users data via their token. This is used in middleware since the edge runtime does not support GRPC
export async function POST(request: Request): Promise<NextResponse<JWTTokenPayload>> {
    try {
        const { token, secret } = await request.json();
        if (!token || !secret) throw new Error("Incorrect body");
        if (token !== app_config.internal_secret_key) throw new Error("Incorrect secret");

        const tokenData = await buildUserdataFromGrpc(token);
        return NextResponse.json(tokenData);
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}
