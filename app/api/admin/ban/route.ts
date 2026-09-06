import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTTokenPayload, getMK8TokenEx } from "@/helpers/types/JWTTokenPayload";
import { amkjGrpcClientWithToken } from "@/helpers/grpc";
import { ClearBanRequest, ClearBanResponse, IssueBanRequest, IssueBanResponse } from "@/helpers/proto/generated/amkj_service";

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

		const data: IssueBanRequest = await request.json();
		data.startTime = new Date(data.startTime as unknown as string);
		if (data.endTime) {
			data.endTime = new Date(data.endTime as unknown as string);
		}

		const res = await amkjGrpcClientWithToken.issueBan(data);

		return NextResponse.json(res as IssueBanResponse);
	} catch (err) {
		console.error(err);
		return new NextResponse("{}", { status: 500 });
	}
}

export async function PATCH(request: Request) {
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

		const data: ClearBanRequest = await request.json();
		const res = await amkjGrpcClientWithToken.clearBan(data);

		return NextResponse.json(res as ClearBanResponse);
	} catch (err) {
		console.error(err);
		return new NextResponse("{}", { status: 500 });
	}
}
