import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Don't cache

export async function GET(request: Request) {
    return new NextResponse("OK", { status: 200 });
}
