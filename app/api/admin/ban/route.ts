import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTTokenPayload, getMK8TokenEx } from "@/helpers/types/JWTTokenPayload";
import { amkj_grpc_client } from "@/helpers/grpc";
import { Metadata } from "nice-grpc";
import app_config from "@/app.config";
import { ClearBanRequest, ClearBanResponse, IssueBanRequest, IssueBanResponse } from "@/helpers/proto/amkj_service";

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

		const data: IssueBanRequest = await request.json();
		data.startTime = new Date(data.startTime as unknown as string);
		data.endTime = new Date(data.endTime as unknown as string);

		const res = await amkj_grpc_client.issueBan(data, {
			metadata: Metadata({
				"X-API-Key": app_config.grpc_api_key,
			}),
		});

		return NextResponse.json(res as IssueBanResponse);
	} catch (err) {
		console.error(err);
		return new NextResponse("{}", { status: 500 });
	}
}

export async function PATCH(request: Request) {
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

		const data: ClearBanRequest = await request.json();
		const res = await amkj_grpc_client.clearBan(data, {
			metadata: Metadata({
				"X-API-Key": app_config.grpc_api_key,
			}),
		});

		return NextResponse.json(res as ClearBanResponse);
	} catch (err) {
		console.error(err);
		return new NextResponse("{}", { status: 500 });
	}
}
