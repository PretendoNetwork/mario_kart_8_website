"use client";

import './page.css'
import { TournamentEntry } from "@/components/TournamentEntry";
import { Tournament } from "@/helpers/proto/amkj_service";
import { useEffect, useMemo, useState } from "react";
import { Alert, Form, InputGroup, Pagination, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import useSWR from 'swr';

const fetchAllTournaments = async () => { 
  const response = await fetch("/api/tournaments?type=all", { cache: "no-store" });
  const json = await response.json();
  return json.tournaments;
}

const REFRESH_INTERVAL = 20;
export const SWR_ALL_TOURNAMENTS_KEY = "allTournaments";

const TournamentNotFoundAlert = () => {
  return (
    <Alert variant="primary">
      <Alert.Heading>No tournament found</Alert.Heading>
      <hr />
      <p>Your searched tournaments does not exist or were not registered yet.</p>
    </Alert>
  )
 }

export default function TournamentsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timer, setTimer] = useState<number>(REFRESH_INTERVAL);

  // Tournament data fetcher
  const { data, error, isLoading, mutate } = useSWR<Tournament[]>(SWR_ALL_TOURNAMENTS_KEY, fetchAllTournaments)

  const sortedTournaments = useMemo(() => {
    return data?.sort((a, b) => {
      // If official, always on top
      if (a.attributes[12] == 2 && b.attributes[12] != 2) return 0
      if (a.attributes[12] == 2) return -1
      if (b.attributes[12] == 2) return 1

      return b.id > a.id ? 1 : -1
    }) ?? []
  }, [data])
  const filteredTournaments = useMemo(() => (
    sortedTournaments.filter((tournament) => tournament.name.includes(searchTerm) || tournament.communityCode.includes(searchTerm))
  ), [sortedTournaments, searchTerm])

  // Start countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((timer) => {
        if (timer === 0) {
          mutate()
          return REFRESH_INTERVAL - 1
        }

        return timer - 1
      })
    }, 1000)
  
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-100 p-4 bg-light shadow-lg preamble my-5">
      <div className='heading'>
        <small className="text-muted fw-medium">Refreshing in {timer} seconds ...</small>
        <h1 className="mb-3">Tournaments</h1>
        <p>The timestamp displayed here are in your local time. If it mismatches from the time displayed in the game, either:</p>
        <ul>
          <li>Your account was registered in a different timezone</li>
          <li>You are using an outdated CEMU version, please use <strong>2.0-43 or higher</strong></li>
        </ul>
      </div>
      
      <InputGroup className="mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
        <InputGroup.Text id="search-term">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Filter by name or code..."
          aria-label="search-term"
          aria-describedby="search-term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </InputGroup>
      
      {error && (
        <Alert variant="danger">
          <Alert.Heading>Error fetching tournaments</Alert.Heading>
          <p>This error should only happen if the NEX server is down, try refreshing the page.</p>
          <hr />
          <p>
            If this happens again, contact the developers on the{" "}
            <Alert.Link href="https://discord.gg/pretendo">Pretendo Discord</Alert.Link>
          </p>
        </Alert>
      )}

      {isLoading
        ? <Spinner animation="border" role="status" className='mx-auto' />
        : filteredTournaments.length === 0
          ? <TournamentNotFoundAlert />
          : (
            <div className="tournament-list">
              {filteredTournaments.map((tournament) => {
                return <TournamentEntry tournament={tournament} key={tournament.id} />;
              })}
            </div>
          )
      }
    </div>
  );
}
