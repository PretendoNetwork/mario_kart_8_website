'use client'

import { KickAllUsersResponse } from "@/helpers/proto/amkj_service";
import { useState } from "react";
import { Alert, Button, InputGroup } from "react-bootstrap";

const AdminPage = () => {

    const [startMaintenance, setStartMaintenance] = useState<string>("");
    const [endMaintenance, setEndMaintenance] = useState<string>("");

    const [isStartMaintenanceDone, setIsStartMaintenanceDone] = useState<boolean>(true);
    const [isEndMaintenanceDone, setIsEndMaintenanceDone] = useState<boolean>(true);

    const [isKickAllDone, setIsKickAllDone] = useState<boolean>(true);

    function startMaintenancePressed() {
        const startDate = new Date(startMaintenance);
        const isStartInvalid = isNaN(startDate.getTime());
        if (isStartInvalid) {
            alert("Start maintenance value is invalid!");
            return;
        }

        const endDate = new Date(endMaintenance);
        const isEndInvalid = isNaN(endDate.getTime());
        if (isEndInvalid) {
            alert("End maintenance value is invalid!");
            return;
        }

        setIsStartMaintenanceDone(false);

        try {
            fetch('/api/admin/maintenance/start', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startTime: startDate.getTime(),
                    endTime: endDate.getTime(),
                })
            }).then((res) => {
                if (res.status == 200) {
                    alert("Success!");
                } else {
                    alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
                }
            });
            setIsStartMaintenanceDone(true);
        } catch (err) {
            setIsStartMaintenanceDone(true);
        }
    }

    function endMaintenancePressed() {
        setIsEndMaintenanceDone(false);
        try {
            fetch('/api/admin/maintenance/end', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            }).then((res) => {
                if (res.status == 200) {
                    alert("Success!");
                } else {
                    alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
                }
            });
            setIsEndMaintenanceDone(true);
        } catch (err) {
            setIsEndMaintenanceDone(true);
        }
    }

    function kickAllPressed() {
        setIsKickAllDone(false);
        try {
            fetch('/api/admin/kick/all', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            }).then((res) => {
                if (res.status != 200) {
                    alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
                }
                res.json().then((data: KickAllUsersResponse) => {
                    alert(`Succes! Kicked ${data.numKicked} players.`);
                });
            });
            setIsKickAllDone(true);
        } catch (err) {
            setIsKickAllDone(true);
        }
    }


    return (
        <>
            <div className="container-fluid m-5 h-100 d-flex justify-content-center align-items-center">
                <form className="text-center w-100 bg-light p-5 rounded-1 shadow-lg">
                    <h1 className="mb-3">Adminstration panel</h1>
                    <Alert variant="info">All datetimes you enter should be in your local time, they are automatically transformed to UTC.</Alert>
                    <InputGroup className="mb-3 justify-content-center align-items-center">
                        <InputGroup.Text>Maintenance start time</InputGroup.Text>
                        <input type="datetime-local" onChange={(event) => setStartMaintenance(event.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3 justify-content-center align-items-center">
                        <InputGroup.Text>Estimated maintenance end time</InputGroup.Text>
                        <input type="datetime-local" onChange={(event) => setEndMaintenance(event.target.value)} />
                    </InputGroup>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Button className="mb-3" disabled={!isStartMaintenanceDone} onClick={startMaintenancePressed}>Start maintenance</Button>
                        <Button className="mb-3" disabled={!isEndMaintenanceDone} onClick={endMaintenancePressed}>End maintenance</Button>
                    </div>
                    <hr />
                    <Button className="mb-3" disabled={!isKickAllDone} onClick={kickAllPressed}>Kick all players</Button>
                    <Alert variant="danger">{"I know it's tempting but don't please lol"}</Alert>
                </form>
            </div>
        </>
    )
}

export default AdminPage;