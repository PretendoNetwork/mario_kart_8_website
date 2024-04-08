"use client";

import Image from "next/image";
import TrackList from "@/helpers/types/TrackList";
import { useState } from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";

export default function RankingsPage() {

    const [currentCup, setCurrentCup] = useState<number>(0);

    return (
        <div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
            <form className="text-center w-100 p-4 bg-light shadow-lg">
                <h1 className="mb-3">Rankings</h1>
                <h6>Select a cup</h6>
                <div className="d-flex flex-wrap justify-content-around btn-group">
                    {TrackList.map((cup, cupIdx) => {
                        return (
                            <button
                                type="button"
                                key={cup.internalName}
                                className={`d-flex flex-column justify-content-between align-items-center btn btn-outline-primary`}
                                style={{ width: '8rem', whiteSpace: "nowrap", backgroundColor: `${currentCup === cupIdx ? "#0D6EFD80" : "inherit"}` }}
                                onClick={() => setCurrentCup(cupIdx)}
                            >
                                <Image className="rounded-circle" src={`/assets/cup/${cup.internalName}.png`} alt={cup.name + " Icon"} width={100} height={100} />
                                <p className="text-dark"><strong>{cup.name}</strong></p>
                            </button>
                        )
                    })}
                </div>
                <hr />
                <div className="d-flex flex-column justify-content-between align-items-center">
                    {TrackList[currentCup].tracks.map((track) => {
                        return (
                            <Link href={`/rankings/${track.id}`} passHref key={track.internalName} style={{ textDecoration: "none" }}>
                                <Card className="mb-3" style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={`/assets/track/${track.internalName}.png`} alt={track.name + " Icon"} />
                                    <Card.Header>
                                        <strong>{track.name}</strong>
                                    </Card.Header>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </form >
        </div >
    );
}