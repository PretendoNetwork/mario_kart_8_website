import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTTokenPayload, getMK8TokenEx } from "@/helpers/types/JWTTokenPayload";
import { amkjGrpcClientWithToken } from "@/helpers/grpc";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const mk8_token = cookieStore.get("mk8_token");
        if (!mk8_token) {
            return new NextResponse("{}", { status: 401 });
        }

        const token: JWTTokenPayload | null = await getMK8TokenEx(mk8_token.value);
        if (!token) {
            return new NextResponse("{}", { status: 401 });
        }

        const res = await amkjGrpcClientWithToken.endMaintenance({});

        return NextResponse.json(res);

    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}