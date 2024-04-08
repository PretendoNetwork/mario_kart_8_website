"use client";

import { GetTimeTrialRankingResponse, TimeTrialRanking } from "@/helpers/proto/amkj_service";
import TrackList from "@/helpers/types/TrackList";
import { useEffect, useState } from "react";
import { Alert, Form, Spinner, Table } from "react-bootstrap";

export default function TrackRankingPage({ params }: { params: { id: string } }) {

    const [rankingResponse, setRankingResponse] = useState<Response | null>(null);

    const [worstRankings, setWorstRankings] = useState<TimeTrialRanking[]>([]);
    const [worstLastFetch, setWorstLastFetch] = useState<Date | null>(null);

    const [bestRankings, setBestRankings] = useState<TimeTrialRanking[]>([]);
    const [bestLastFetch, setBestLastFetch] = useState<Date | null>(null);

    const [filterAsc, setFilterAsc] = useState<boolean>(true);

    async function fetchRankings(asc: boolean) {
        if (asc) {
            if (bestLastFetch && new Date().getTime() - bestLastFetch.getTime() < 15000) {
                return;
            }
        } else {
            if (worstLastFetch && new Date().getTime() - worstLastFetch.getTime() < 15000) {
                return;
            }
        }

        try {
            const response = await fetch(`/api/rankings/${params.id}?${asc ? "" : "desc"}`, { cache: "no-store" });
            setRankingResponse(response);
            const data: GetTimeTrialRankingResponse = await response.json();

            if (asc) {
                setBestRankings(data.rankings);
                setBestLastFetch(new Date());
            } else {
                setWorstRankings(data.rankings);
                setWorstLastFetch(new Date());
            }
        } catch (error) {
            console.error('Failed to fetch rankings:', error);
            setRankingResponse(null);
        }
    }

    function scoreToTime(score: number): string {
        const milliseconds = score % 1000;
        const seconds = Math.floor(score / 1000) % 60;
        const minutes = Math.floor(Math.floor(score / 1000) / 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
    }

    function commonDataToMiiName(data: { data: number[] }): string {
        const str = data.data;
        const account_related_data = str.slice(0x14, 0x74);
        const mii_name = account_related_data.slice(0x1a, 0x2e);

        const u16Array = new Uint16Array(mii_name);
        let name = "";
        for (let i = 0; i < u16Array.length; i++) {
            name += String.fromCharCode(u16Array[i]);
        }

        return name;
    }

    useEffect(() => {
        fetchRankings(filterAsc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterAsc]);

    const trackId = parseInt(params.id);
    if (isNaN(trackId)) {
        return (
            <div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
                <form className="text-center w-100 p-4 bg-light shadow-lg">
                    <Alert variant="danger">Invalid track ID! (Not a number)</Alert>
                </form>
            </div>);
    }

    const track = TrackList.find((cup) => cup.tracks.find((track) => track.id === trackId))?.tracks.find((track) => track.id === trackId);
    if (!track) {
        return (
            <div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
                <form className="text-center w-100 p-4 bg-light shadow-lg">
                    <Alert variant="danger">Invalid track ID! (ID does not exist)</Alert>
                </form>
            </div>);
    }

    const rankings = filterAsc ? bestRankings : worstRankings;

    return (
        <div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
            <form className="text-center w-100 p-4 bg-light shadow-lg">
                <h1 className="mb-3">Rankings: {track.name}</h1>
                <Form.Select
                    defaultValue={"0"}
                    className="mx-auto"
                    style={{ width: "18rem" }}
                    onChange={(event) => {
                        const value = parseInt(event.target.value);
                        setFilterAsc(value === 0);
                        fetchRankings(value === 0);

                    }}>
                    <option value="0">Filter by best time</option>
                    <option value="1">Filter by worst time</option>
                </Form.Select>
                <div className="mt-3">
                    {!rankingResponse && <Spinner animation="border" role="status" />}
                    {rankingResponse && rankingResponse.status !== 200 && (
                        <Alert variant="danger">
                            <Alert.Heading>Error fetching rankings</Alert.Heading>
                            <p>
                                This error should only happen if the NEX server is down, try refreshing the page.
                            </p>
                            <hr />
                            <p>
                                If this happens again, contact the developers on the <Alert.Link href="https://discord.gg/pretendo">Pretendo Discord</Alert.Link>
                            </p>
                        </Alert>
                    )}
                    {rankingResponse && rankingResponse.status === 200 && rankings && rankings.length === 0 && <Alert variant="info">No rankings for this track yet!</Alert>}
                    {rankingResponse && rankingResponse.status === 200 && rankings && rankings.length !== 0 && (
                        <Table striped bordered hover responsive className="mx-auto" style={{ maxWidth: "48rem" }}>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>PID</th>
                                    <th>Mii Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankings.map((ranking, idx) => (
                                    <tr key={idx}>
                                        <td>{ranking.rank}</td>
                                        <td>{ranking.pid}</td>
                                        <td>{commonDataToMiiName(ranking.commonData as any)}</td>
                                        <td>{scoreToTime(ranking.score)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>

            </form>
        </div>
    );

}
