'use client'

import { TournamentEntry } from '@/components/TournamentEntry';
import { Tournament } from '@/helpers/proto/amkj_service';
import { useEffect, useState } from 'react';
import { Alert, Form, InputGroup, Pagination, Spinner } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

export default function TournamentsPage() {

    const updateTime = 20;
    const entryPerPage = 10;

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [allTournamentsResponse, setAllTournamentsResponse] = useState<Response | null>(null);
    const [allTournaments, setAllTournaments] = useState<Tournament[]>([]);
    const [timer, setTimer] = useState<number>(updateTime - 1);

    let tournamentPool = allTournaments.filter((tournament) => (tournament.name.includes(searchTerm) || tournament.communityCode.includes(searchTerm)));

    let maxPage = 0;
    let tournamentPage: Tournament[] = [];
    let tournamentPaginationJSX: any[] = [];
    if (tournamentPool.length > 0) {
        maxPage = Math.ceil(tournamentPool.length / entryPerPage);
        tournamentPage = tournamentPool.slice(currentPage * entryPerPage, (currentPage + 1) * entryPerPage);

        if (currentPage >= maxPage) setCurrentPage(0);

        if (maxPage >= 0) {
            tournamentPaginationJSX.push(
                <Pagination key="tournamentPagination" className="mt-3 d-flex flex-wrap justify-content-center">
                    <Pagination.Prev onClick={() => setCurrentPage((currentPage) => currentPage - 1)} disabled={currentPage === 0} />
                    {
                        Array.from({ length: maxPage }, (_, idx) => {
                            return (
                                <Pagination.Item key={idx} active={currentPage === idx} onClick={() => setCurrentPage(idx)}>
                                    {idx + 1}
                                </Pagination.Item>
                            );
                        })
                    }
                    <Pagination.Next onClick={() => setCurrentPage((currentPage) => currentPage + 1)} disabled={currentPage === maxPage - 1} />
                </Pagination>
            );
        }
    }

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
                if (tournamentPool.length > 0) {
                    return (
                        <>
                            <Alert variant="info">
                                <p>
                                    {"The times displayed here are in your local time. If they mismatch from the times you've entered in game, either:"}
                                </p>
                                <p>• Your account was registered in a different timezone</p>
                                <p>• You are using an outdated CEMU version, please use <strong>2.0-43 or higher</strong>.</p>
                            </Alert>
                            <InputGroup className="mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
                                <InputGroup.Text id="search-term"><FaSearch /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Filter by name or code..."
                                    aria-label="search-term"
                                    aria-describedby="search-term"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </InputGroup>
                            <div className="mx-auto">{tournamentPaginationJSX}</div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                {
                                    tournamentPage.map((tournament, idx) => {
                                        return (
                                            <div className="ms-5 me-5 mb-3" key={idx}>
                                                <TournamentEntry tournament={tournament} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="mx-auto">{tournamentPaginationJSX}</div>
                        </>
                    );
                } else {
                    return (
                        <div>
                            <InputGroup className="mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
                                <InputGroup.Text id="search-term"><FaSearch /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Filter by name or code..."
                                    aria-label="search-term"
                                    aria-describedby="search-term"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </InputGroup>

                            <Alert variant="primary" onClick={() => { document.location.reload() }}>
                                <Alert.Heading>No tournaments!</Alert.Heading>
                                <hr />
                                <p>
                                    This means no tournaments matches your search or that no tournaments were registered yet.
                                </p>
                            </Alert>
                        </div>
                    )
                }
            }
        }
    }

    return (
        <>
            <div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
                <form className="text-center w-100 p-5 bg-light shadow-lg">
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