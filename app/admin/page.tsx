"use client";

import {
	ClearBanRequest,
	DeleteAllTimeTrialRankingsRequest,
	DeleteTimeTrialRankingRequest,
	IssueBanRequest,
	KickAllUsersResponse,
} from "@/helpers/proto/amkj_service";
import TrackList from "@/helpers/types/TrackList";
import { useState } from "react";
import { Alert, Button, FormSelect, InputGroup } from "react-bootstrap";

const AdminPage = () => {
	const [startMaintenance, setStartMaintenance] = useState<string>("");
	const [endMaintenance, setEndMaintenance] = useState<string>("");

	const [isStartMaintenanceDone, setIsStartMaintenanceDone] = useState<boolean>(true);
	const [isEndMaintenanceDone, setIsEndMaintenanceDone] = useState<boolean>(true);

	const [isKickAllDone, setIsKickAllDone] = useState<boolean>(true);

	const [rankingPID, setRankingPID] = useState<number>();
	const [rankingTrack, setRankingTrack] = useState<number>();

	const [startBan, setStartBan] = useState<string>("");
	const [endBan, setEndBan] = useState<string>("");
	const [bannedPID, setBannedPID] = useState<number>();
	const [banReason, setBanReason] = useState<string>("");

	const trackList = TrackList.flatMap((cup) => {
		return cup.tracks.map((track) => {
			return { name: cup.name + " | " + track.name, id: track.id };
		});
	});

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
			fetch("/api/admin/maintenance/start", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					startTime: startDate.getTime(),
					endTime: endDate.getTime(),
				}),
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
			fetch("/api/admin/maintenance/end", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
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
			fetch("/api/admin/kick/all", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			}).then((res) => {
				if (res.status != 200) {
					alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
					return;
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

	function removeRankings() {
		if (rankingPID === undefined || isNaN(rankingPID)) {
			alert("PID is invalid!");
			return;
		}

		if (rankingTrack === undefined || isNaN(rankingTrack)) {
			if (!confirm("Are you sure you want to delete all rankings for PID " + rankingPID + "?")) {
				return;
			}

			const req: DeleteAllTimeTrialRankingsRequest = { pid: rankingPID };
			fetch("/api/admin/rankings/all", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(req),
			}).then((res) => {
				if (res.status != 200) {
					alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
					return;
				}
				res.json().then(() => {
					alert("Succes!");
				});
			});
		} else {
			if (!confirm("Are you sure you want to delete all rankings for PID " + rankingPID + " on track " + rankingTrack + "?")) {
				return;
			}

			const req: DeleteTimeTrialRankingRequest = { pid: rankingPID, track: rankingTrack };
			fetch("/api/admin/rankings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(req),
			}).then((res) => {
				if (res.status != 200) {
					alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
					return;
				}
				res.json().then(() => {
					alert("Succes!");
				});
			});
		}
	}

	function issueBan() {
		if (bannedPID === undefined || isNaN(bannedPID)) {
			alert("PID is invalid!");
			return;
		}

		const startDate = new Date(startBan);
		const isStartInvalid = isNaN(startDate.getTime());
		if (isStartInvalid) {
			alert("Start date is invalid!");
			return;
		}

		const endDate = new Date(endBan);
		const isEndInvalid = isNaN(endDate.getTime());
		if (isEndInvalid) {
			alert("End date is invalid!");
			return;
		}

		const req: IssueBanRequest = {
			pid: bannedPID,
			startTime: startDate,
			endTime: endDate,
			reason: banReason,
		};

		fetch("/api/admin/ban", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req),
		}).then((res) => {
			if (res.status != 200) {
				alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
				return;
			}
			res.json().then(() => {
				alert("Succes!");
			});
		});
	}

	function clearBan() {
		if (bannedPID === undefined || isNaN(bannedPID)) {
			alert("PID is invalid!");
			return;
		}

		if (!confirm("Are you sure you want to clear all bans for PID " + bannedPID + "?")) {
			return;
		}

		const req: ClearBanRequest = {
			pid: bannedPID,
		};

		fetch("/api/admin/ban", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req),
		}).then((res) => {
			if (res.status != 200) {
				alert(`Failure... with HTTP status ${res.status} ${res.statusText}`);
				return;
			}
			res.json().then(() => {
				alert("Succes!");
			});
		});
	}

	return (
		<>
			<div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
				<form className="text-center w-100 p-5 bg-light shadow-lg">
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
						<Button className="mb-3" disabled={!isStartMaintenanceDone} onClick={startMaintenancePressed}>
							Start maintenance
						</Button>
						<Button className="mb-3" disabled={!isEndMaintenanceDone} onClick={endMaintenancePressed}>
							End maintenance
						</Button>
					</div>
					<hr />
					<Button className="mb-3" disabled={!isKickAllDone} onClick={kickAllPressed}>
						Kick all players
					</Button>
					<Alert variant="danger">{"I know it's tempting but don't please lol"}</Alert>
					<hr />
					<InputGroup className="mb-3 justify-content-center align-items-center">
						<InputGroup.Text>PID</InputGroup.Text>
						<input type="number" onChange={(event) => setRankingPID(parseInt(event.target.value))} />
					</InputGroup>
					<InputGroup className="mb-3 justify-content-center align-items-center">
						<InputGroup.Text>Track</InputGroup.Text>
						<FormSelect style={{ maxWidth: "350px" }} onChange={(event) => setRankingTrack(parseInt(event.target.value))}>
							<option value={undefined}>All tracks</option>
							{trackList.map((track) => {
								return (
									<option key={track.id} value={track.id}>
										{track.name}
									</option>
								);
							})}
						</FormSelect>
					</InputGroup>
					<Button className="mb-3" onClick={removeRankings} disabled={rankingPID === undefined || isNaN(rankingPID)}>
						Delete ranking
					</Button>
					<hr />
					<InputGroup className="mb-3 justify-content-center align-items-center">
						<InputGroup.Text>Ban PID</InputGroup.Text>
						<input type="number" onChange={(event) => setBannedPID(parseInt(event.target.value))} />
					</InputGroup>
					<InputGroup className="mb-3 justify-content-center align-items-center">
						<InputGroup.Text>Ban start</InputGroup.Text>
						<input type="datetime-local" onChange={(event) => setStartBan(event.target.value)} />
					</InputGroup>
					<InputGroup className="mb-3 justify-content-center align-items-center">
						<InputGroup.Text>Ban end</InputGroup.Text>
						<input type="datetime-local" onChange={(event) => setEndBan(event.target.value)} />
					</InputGroup>
					<InputGroup className="mb-3 justify-content-center align-items-center">
						<InputGroup.Text>Reason</InputGroup.Text>
						<input type="text" onChange={(event) => setBanReason(event.target.value)} />
					</InputGroup>
					<div className="d-flex flex-column justify-content-center align-items-center">
						<Button className="mb-3" onClick={issueBan} variant="danger" disabled={bannedPID === undefined || isNaN(bannedPID)}>
							Ban
						</Button>
						<Button className="mb-3" onClick={clearBan} disabled={bannedPID === undefined || isNaN(bannedPID)}>
							Clear bans
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default AdminPage;
