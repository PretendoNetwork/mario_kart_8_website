import app_config from "@/app.config";
import { amkj_grpc_client } from "@/helpers/grpc";
import { GetAllBansResponse } from "@/helpers/proto/amkj_service";
import { NextResponse } from "next/server";
import { Metadata } from "nice-grpc";

var allBans: GetAllBansResponse | null = null;
var lastAllBansTime: Date = new Date();

export async function GET(request: Request) {
	request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

	try {
		if (!allBans || new Date().getTime() - lastAllBansTime.getTime() > 5000) {
			allBans = await amkj_grpc_client.getAllBans(
				{ offset: 0, limit: -1 },
				{
					metadata: Metadata({
						"X-API-Key": app_config.grpc_api_key,
					}),
				},
			);
			lastAllBansTime = new Date();
		}

		console.log(allBans);
		return NextResponse.json(allBans);
	} catch (err) {
		return new NextResponse("{}", { status: 500 });
	}
}
