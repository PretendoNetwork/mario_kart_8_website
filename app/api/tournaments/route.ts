import app_config from "@/app.config";
import { amkj_grpc_client } from "@/helpers/grpc";
import { GetAllTournamentsResponse, Tournament } from "@/helpers/proto/amkj_service";
import { NextResponse } from "next/server";
import { Metadata } from "nice-grpc";

var allTournaments: GetAllTournamentsResponse | null = null;
var lastAllTournamentsTime: Date = new Date();

function sortAllTournaments(myList: Tournament[]): Tournament[] {
    return myList.sort((t1, t2) => {
        // Check if attributes[13] is equal to 2
        const t1_isOfficial = t1.attributes[12] === 2;
        const t2_isOfficial = t2.attributes[12] === 2;

        if (t1_isOfficial && !t2_isOfficial) {
            return -1;
        } else if (!t1_isOfficial && t2_isOfficial) {
            return 1;
        } else {
            return t1.attributes[12] !== 2 ? t2.totalParticipants - t1.totalParticipants : 0;
        }
    });
}


export async function GET(request: Request) {
    request.url; // https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers

    try {
        if (!allTournaments || ((new Date().getTime() - lastAllTournamentsTime.getTime()) > 5000)) {
            allTournaments = await amkj_grpc_client.getAllTournaments({ offset: 0, limit: -1 }, {
                metadata: Metadata({
                    "X-API-Key": app_config.grpc_api_key
                })
            });
            sortAllTournaments(allTournaments.tournaments);
            lastAllTournamentsTime = new Date();
        }
        return NextResponse.json(allTournaments);
    } catch (err) {
        return new NextResponse("{}", { status: 500 });
    }
}