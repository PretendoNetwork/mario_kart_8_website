"use client";

import { Ban, GetAllBansResponse } from "@/helpers/proto/amkj_service";
import { useEffect, useState } from "react";
import { Alert, Spinner, Table } from "react-bootstrap";

export default function BansPage() {
	const updateTime = 20;

	const [allBansResponse, setAllBansResponse] = useState<Response | null>(null);
	const [allBans, setAllBans] = useState<Ban[]>([]);
	const [timer, setTimer] = useState<number>(updateTime - 1);

	const fetchAllBans = async () => {
		try {
			const response = await fetch("/api/bans", { cache: "no-store" });
			setAllBansResponse(response);
			const data = (await response.json()) as GetAllBansResponse;
			setAllBans(data.bans);
		} catch (error) {
			console.error("Failed to fetch all bans:", error);
			setAllBansResponse(null);
		}
	};

	useEffect(() => {
		const fetchAllBansAndStartTimer = async () => {
			await fetchAllBans();
			setTimer(updateTime - 1);
		};

		// Call fetchAllBans when the page is loaded
		fetchAllBansAndStartTimer();

		const timerInterval = setInterval(() => {
			setTimer((timer) => {
				if (timer === 0) {
					fetchAllBansAndStartTimer();
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
		if (!allBansResponse) {
			return <Spinner animation="border" role="status" />;
		} else {
			if (allBansResponse.status != 200) {
				return (
					<Alert
						variant="danger"
						onClick={() => {
							document.location.reload();
						}}
					>
						<Alert.Heading>Error fetching bans</Alert.Heading>
						<p>This error should only happen if the NEX server is down, try refreshing the page.</p>
						<hr />
						<p>
							If this happens again, contact the developers on the{" "}
							<Alert.Link href="https://discord.gg/pretendo">Pretendo Discord</Alert.Link>
						</p>
					</Alert>
				);
			} else {
				if (allBans.length > 0) {
					return (
						<div className="d-flex flex-wrap justify-content-center">
							<Table striped bordered hover responsive className="mx-auto">
								<thead>
									<tr>
										<th>PID</th>
										<th>Reason</th>
										<th>Start date</th>
										<th>End date</th>
									</tr>
								</thead>
								<tbody>
									{allBans.map((ban, idx) => {
										return (
											<tr key={idx}>
												<td>{ban.pid}</td>
												<td>{ban.reason}</td>
												<td>{new Date(ban.startTime as unknown as string).toLocaleString()}</td>
												<td>{ban.endTime ? new Date(ban.endTime as unknown as string).toLocaleString() : "infinite"}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					);
				} else {
					return (
						<Alert
							variant="primary"
							onClick={() => {
								document.location.reload();
							}}
						>
							<Alert.Heading>No player banned!</Alert.Heading>
							<hr />
							<p>This means no players are currently banned.</p>
						</Alert>
					);
				}
			}
		}
	};

	return (
		<>
			<div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
				<form className="text-center w-100 p-5 bg-light shadow-lg">
					<h6>
						<small className="text-muted">Refreshing in {timer} seconds ...</small>
					</h6>
					<h1 className="mb-3">Bans</h1>
					<div>{getPageJSX()}</div>
				</form>
			</div>
		</>
	);
}
