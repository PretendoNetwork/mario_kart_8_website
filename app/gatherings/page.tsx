'use client'

import { GatheringEntry } from '@/components/GatheringEntry';
import { Gathering } from '@/helpers/proto/amkj_service';
import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export default function GatheringsPage() {

    const updateTime = 20;

    const [allGatheringsResponse, setAllGatheringsResponse] = useState<Response | null>(null);
    const [allGatherings, setAllGatherings] = useState<Gathering[]>([]);
    const [timer, setTimer] = useState<number>(updateTime - 1);

    const fetchAllGatherings = async () => {
        try {
            const response = await fetch('/api/gatherings', { cache: "no-store" });
            setAllGatheringsResponse(response);
            const data = await response.json();
            setAllGatherings(data.gatherings);
        } catch (error) {
            console.error('Failed to fetch all gatherings:', error);
            setAllGatheringsResponse(null);
        }
    }

    useEffect(() => {
        fetchAllGatherings();
        const fetchInterval = setInterval(fetchAllGatherings, updateTime * 1000);
        const timerInterval = setInterval(() => {
            setTimer((timer) => {
                if (timer == 0) {
                    return updateTime - 1;
                } else {
                    return timer - 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(timerInterval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPageJSX = () => {
        if (!allGatheringsResponse) {
            return <Spinner animation="border" role="status" />;
        } else {
            if (allGatheringsResponse.status != 200) {
                return (
                    <Alert variant="danger" onClick={() => { document.location.reload() }}>
                        <Alert.Heading>Error fetching gatherings</Alert.Heading>
                        <p>
                            This error should never happen, try refreshing the page!
                        </p>
                        <hr />
                        <p>
                            If this happens again, contact the developers on the <Alert.Link href="https://discord.gg/pretendo">Pretendo Discord</Alert.Link>
                        </p>
                    </Alert>
                );
            } else {
                if (allGatherings.length > 0) {
                    return (
                        <div className="d-flex flex-wrap justify-content-center">
                            {
                                allGatherings.map((gat, idx) => {
                                    return (
                                        <div className="ms-5 me-5 mb-3" key={idx}>
                                            <GatheringEntry gathering={gat} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                } else {
                    return (
                        <Alert variant="primary" onClick={() => { document.location.reload() }}>
                            <Alert.Heading>No gatherings!</Alert.Heading>
                            <hr />
                            <p>
                                This means no players are currently in a matchmaking session, join the <Alert.Link href="https://discord.gg/pretendo">Pretendo Discord</Alert.Link> to communicate with other players.
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
                <form className="form-floating text-center w-100 bg-light p-5 rounded-1 shadow-lg">
                    <h6><small className="text-muted">Refreshing in {timer} seconds ...</small></h6>
                    <h1 className="mb-3">Gatherings</h1>
                    <div>
                        {getPageJSX()}
                    </div>
                </form>
            </div>
        </>

    )
}