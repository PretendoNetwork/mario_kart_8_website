import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTTokenPayload, getMK8TokenEx } from "@/helpers/types/JWTTokenPayload";
import { amkj_grpc_client } from "@/helpers/grpc";
import { Metadata } from "nice-grpc";
import app_config from "@/app.config";
import { DeleteAllTimeTrialRankingsRequest, DeleteAllTimeTrialRankingsResponse } from "@/helpers/proto/amkj_service";

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

		const data: DeleteAllTimeTrialRankingsRequest = await request.json();
		const res = await amkj_grpc_client.deleteAllTimeTrialRankings(data, {
			metadata: Metadata({
				"X-API-Key": app_config.grpc_api_key,
			}),
		});

		return NextResponse.json(res as DeleteAllTimeTrialRankingsResponse);
	} catch (err) {
		return new NextResponse("{}", { status: 500 });
	}
}
