import { amkjGrpcClientWithToken } from "@/helpers/grpc";
import { GetAllBansResponse } from "@/helpers/proto/generated/amkj_service";
import { NextResponse } from "next/server";

var allBans: GetAllBansResponse | null = null;
var lastAllBansTime: Date = new Date();

export async function GET(request: Request) {
	request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

	try {
		if (!allBans || new Date().getTime() - lastAllBansTime.getTime() > 5000) {
			allBans = await amkjGrpcClientWithToken.getAllBans({ offset: 0, limit: -1 });
			lastAllBansTime = new Date();

			allBans.bans = allBans.bans.sort((a, b) => {
				if (a.startTime && b.startTime) {
					return b.startTime.getTime() - a.startTime.getTime();
				} else {
					return 0;
				}
			});
		}

		return NextResponse.json(allBans);
	} catch (err) {
		return new NextResponse("{}", { status: 500 });
	}
}
