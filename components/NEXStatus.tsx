'use client'

import Link from 'next/link';
import { GetServerStatusResponse } from '@/helpers/proto/amkj_service';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { StaticPopover } from './StaticPopover';

export const NEXStatus = () => {

    const [statusResponse, setStatusResponse] = useState<Response | null>(null);
    const [nexStatus, setNEXStatus] = useState<GetServerStatusResponse | null>(null);

    const fetchNEXStatus = async () => {
        try {
            const response = await fetch('/api/status', { cache: "no-store" });
            setStatusResponse(response);

            const data = await response.json();
            setNEXStatus(data as GetServerStatusResponse);
        } catch (error) {
            console.error('Failed to fetch NEX server status:', error);
        }
    }

    useEffect(() => {
        fetchNEXStatus();
        const interval = setInterval(fetchNEXStatus, 10000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!statusResponse) {
        return (
            <StaticPopover
                title={
                    <strong className="me-auto">Fetching server status</strong>
                }
                body={
                    <Spinner animation="border" role="status" />
                } />
        );
    } else {
        if (statusResponse.status != 200 || !nexStatus) {
            return (
                <StaticPopover
                    title={
                        <strong className="me-auto">🔴 Error fetching server status</strong>
                    }
                    body={
                        <>
                            <span>The problem is on our side:</span>
                            <ul className="mt-3">
                                <li>The NEX server may be down</li>
                                <li>Server may be misconfigured</li>
                            </ul>
                        </>
                    } />
            );
        } else {
            if (nexStatus.isMaintenance) {
                const startMaintenanceDate = new Date(nexStatus.startMaintenanceTime as Date);
                const endMaintenanceDate = new Date(nexStatus.endMaintenanceTime as Date);
                const currentDate = new Date();

                let numSeconds = Math.floor((endMaintenanceDate.getTime() - currentDate.getTime()) / 1000);
                let numMinutes = Math.floor(numSeconds / 60);

                if (numSeconds > 0) {
                    if (numMinutes > 60) {
                        let numHours = Math.floor(numMinutes / 60);
                        var text = <span>🟠 {`Maintenance is over in ${numHours}h${numMinutes % 60}min`}</span>;
                    } else {
                        var text = <span>🟠 {`Maintenance is over in ${numMinutes}min`}</span>;
                    }
                } else {
                    numSeconds = Math.abs(numSeconds);
                    numMinutes = Math.floor(numSeconds / 60);
                    if (numMinutes > 60) {
                        let numHours = Math.floor(numMinutes / 60);
                        var text = <span>🟠 {`Maintenance has been extended by ${numHours}h${numMinutes % 60}min`}</span>;
                    } else {
                        var text = <span>🟠 {`Maintenance has been extended by ${numMinutes}min`}</span>;
                    }
                }
                return (
                    <StaticPopover
                        title={
                            <strong className="me-auto">{text}</strong>
                        }
                        body={
                            <>
                                <span>The server is aware of these maintenance times:</span>
                                <ul className="mt-3">
                                    <li>Start: <strong>{startMaintenanceDate.toLocaleString()}</strong></li>
                                    <li>End: <strong>{endMaintenanceDate.toLocaleString()}</strong></li>
                                </ul>
                            </>
                        } />
                );
            } else if (nexStatus.isWhitelist) {
                return (
                    <StaticPopover
                        title={
                            <strong className="me-auto">⚫ Whitelist mode</strong>
                        }
                        body={
                            <>
                                <span>Only allowed users can join the server</span>
                                <ul className="mt-3">
                                    <li>This mode was activated by an admin</li>
                                    <li>This is different from our functionality where only supporters can access the server</li>
                                    <li>This is activated for private testing and development only</li>
                                </ul>
                            </>
                        } />
                );
            } else {
                return (
                    <StaticPopover
                        title={
                            <strong className="me-auto">🟢 {`Online with ${nexStatus.numClients} player${(nexStatus.numClients == 0 || nexStatus.numClients > 1) ? 's' : ''}`}</strong>
                        }
                        body={
                            <>
                                The server is online, join the server on the
                                <Link href="https://pretendo.network" style={{ textDecoration: "none" }}> Pretendo Network</Link>
                            </>
                        }
                        align_center={true} />
                );
            }
        }
    }
}