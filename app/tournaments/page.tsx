'use client'

import { TournamentEntry } from '@/components/TournamentEntry';
import { Tournament } from '@/helpers/proto/amkj_service';
import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export default function TournamentsPage() {

    const updateTime = 20;

    const [allTournamentsResponse, setAllTournamentsResponse] = useState<Response | null>(null);
    const [allTournaments, setAllTournaments] = useState<Tournament[]>([]);
    const [timer, setTimer] = useState<number>(updateTime - 1);

    const fetchAllTournaments = async () => {
        try {
            const response = await fetch('/api/tournaments?type=all', { cache: "no-store" });
            setAllTournamentsResponse(response);
            const data = await response.json();
            setAllTournaments(data.tournaments);
        } catch (error) {
            console.error('Failed to fetch all tournaments:', error);
            setAllTournamentsResponse(null);
        }
    }

    useEffect(() => {
        const fetchAllTournamentsAndStartTimer = async () => {
            await fetchAllTournaments();
            setTimer(updateTime - 1);
        };


        fetchAllTournamentsAndStartTimer();
        const timerInterval = setInterval(() => {
            setTimer((timer) => {
                if (timer === 0) {
                    fetchAllTournamentsAndStartTimer();
                    return updateTime - 1;
                } else {
                    return timer - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timerInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getPageJSX = () => {
        if (!allTournamentsResponse) {
            return <Spinner animation="border" role="status" />;
        } else {
            if (allTournamentsResponse.status != 200) {
                return (
                    <Alert variant="danger" onClick={() => { document.location.reload() }}>
                        <Alert.Heading>Error fetching tournaments</Alert.Heading>
                        <p>
                            This error should only happen if the NEX server is down, try refreshing the page.
                        </p>
                        <hr />
                        <p>
                            If this happens again, contact the developers on the <Alert.Link href="https://discord.gg/pretendo">Pretendo Discord</Alert.Link>
                        </p>
                    </Alert>
                );
            } else {
                if (allTournaments.length > 0) {
                    return (
                        <>
                            <Alert variant="info">
                                <p>
                                    {"The times displayed here are in your local time. If they mismatch from the times you've entered in game, either:"}
                                </p>
                                <li>Your account was registered in a different timezone</li>
                                <li>You are using an outdated CEMU version, please use <strong>2.0-43 or higher</strong>.</li>
                            </Alert>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                {
                                    allTournaments.map((tournament, idx) => {
                                        return (
                                            <>
                                                <div className="ms-5 me-5 mb-3" key={idx}>
                                                    <TournamentEntry tournament={tournament} />
                                                </div>
                                            </>
                                        );
                                    })
                                }
                            </div>
                        </>
                    );
                } else {
                    return (
                        <Alert variant="primary" onClick={() => { document.location.reload() }}>
                            <Alert.Heading>No tournaments!</Alert.Heading>
                            <hr />
                            <p>
                                This means no tournaments were registered yet.
                            </p>
                        </Alert>
                    )
                }
            }
        }
    }

    return (
        <>
            <div className="container-fluid m-5 h-100 d-flex justify-content-center align-items-center">
                <form className="text-center w-100 bg-light p-5 rounded-1 shadow-lg">
                    <h6><small className="text-muted">Refreshing in {timer} seconds ...</small></h6>
                    <h1 className="mb-3">Tournaments</h1>
                    <div>
                        {getPageJSX()}
                    </div>
                </form>
            </div>
        </>

    )
}