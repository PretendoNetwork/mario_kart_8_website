/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert, Badge, Carousel, ListGroup, Tab, Tabs } from "react-bootstrap";

import Session1Image from "../public/session1.png";
import Compe1Image from "../public/compe1.png";
import Mktv1Image from "../public/mktv1.png";
import Compe2Image from "../public/compe2.png";

const HomePage = () => {
	return (
		<div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
			<form className="text-center w-100 p-5 bg-light shadow-lg">
				<h1 className="mb-3">Welcome to the Pretendo Mario Kart 8 website</h1>
				<h6>
					<small className="text-muted">A full game server replacement for MK8</small>
				</h6>
				<Alert variant="warning" className="w-75 mx-auto">
					<p>Update changelog:</p>
					<div>
						<li>Fix friend rooms bug, they now work as expected.</li>
						<li>Fix rankings ghost and MKTV downloads! (no more 106-1201)</li>
					</div>
				</Alert>
				<Tabs defaultActiveKey="home" className="mb-3">
					<Tab eventKey="home" title="Overview">
						<Carousel className="mb-3" variant="dark">
							<Carousel.Item>
								<Image
									src={Session1Image}
									alt="Lots of nostalgia"
									className="d-block w-100 mx-auto"
									style={{ maxHeight: "720px", maxWidth: "1280px" }}
									priority
								/>
							</Carousel.Item>
							<Carousel.Item>
								<Image
									src={Compe1Image}
									alt="Tournament being played"
									className="d-block w-100 mx-auto"
									style={{ maxHeight: "720px", maxWidth: "1280px" }}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<Image
									src={Mktv1Image}
									alt="Tournament being played"
									className="d-block w-100 mx-auto"
									style={{ maxHeight: "720px", maxWidth: "1280px" }}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<Image
									src={Compe2Image}
									alt="Tournament being played"
									className="d-block w-100 mx-auto"
									style={{ maxHeight: "720px", maxWidth: "1280px" }}
								/>
							</Carousel.Item>
						</Carousel>
						<p>{"Astute readers may have noticed how I (Rambo6Glaz) won both tournaments."}</p>
						<Alert>
							<Alert.Heading>How to play on this server?</Alert.Heading>
							<hr />
							<p>
								• Follow the steps to join the Pretendo Network on <Link href="https://pretendo.network">our website</Link>!
							</p>
							<p>• Create / log on your PNID account and simply start Mario Kart 8</p>
						</Alert>
						<Alert variant="success">
							<Alert.Heading>Is there any rules?</Alert.Heading>
							<hr />
							<p>• You may only use cheats in friend rooms</p>
							<p>• You should not disrupt gameplay or server uptime</p>
							<p>• {"Do not generate any user-content (tournament, Mii names) with injury or NSFW content."}</p>
							<p>• You may have fun. {"(If red shells allow you)"}</p>
							<p>• Have common sense, we may issue a ban even for something that is not on list</p>
							<hr />
							<p className="mb-0">
								<strong>Breaching the rules can get your account or console temporarily/permanently banned from our services</strong>{" "}
								(🤓)
							</p>
						</Alert>
					</Tab>
					<Tab eventKey="features" title="Features">
						<h3>{"What's implemented ?"}</h3>

						<div className={`mx-auto w-auto`}>
							<ListGroup className="mb-3">
								<strong>
									<ListGroup.Item variant="primary">Works for everyone</ListGroup.Item>
									<ListGroup.Item variant="info">
										Fully/partially a Miiverse related feature, might no be available on Cemu, might require a Tester account.
									</ListGroup.Item>
									<ListGroup.Item variant="danger">Does NOT work</ListGroup.Item>
								</strong>
							</ListGroup>
							<hr />

							<ListGroup className="mt-3 mb-3">
								<strong>
									<ListGroup.Item variant="primary">Global matchmaking</ListGroup.Item>
									<ListGroup.Item variant="primary">Regional matchmaking</ListGroup.Item>
									<ListGroup.Item variant="primary">Friend rooms</ListGroup.Item>
									<ListGroup.Item variant="primary">Join a friend by the friend list / friend presence</ListGroup.Item>
									<ListGroup.Item variant="primary">Join a recent player</ListGroup.Item>
								</strong>
							</ListGroup>
							<hr />

							<ListGroup className="mt-3 mb-3">
								<strong>
									<ListGroup.Item variant="info">Tournaments creation / deletion / update</ListGroup.Item>
									<ListGroup.Item variant="primary">Tournament participation</ListGroup.Item>
									<ListGroup.Item variant="primary">Tournament search by filter or code</ListGroup.Item>
									<ListGroup.Item variant="primary">Tournament rankings (team and normal)</ListGroup.Item>
									<ListGroup.Item variant="info">Post in the Tournament community</ListGroup.Item>
									<ListGroup.Item variant="info">View posts from the tournament community</ListGroup.Item>
								</strong>
							</ListGroup>
							<hr />

							<ListGroup className="mt-3 mb-3">
								<strong>
									<ListGroup.Item variant="primary">Rankings</ListGroup.Item>
									<ListGroup.Item variant="primary">Rankings ghost download</ListGroup.Item>
									<ListGroup.Item variant="info">Rankings Miiverse posts download</ListGroup.Item>
									<ListGroup.Item variant="info">Rankings ghost upload</ListGroup.Item>
								</strong>
							</ListGroup>
							<hr />

							<ListGroup className="mt-3 mb-3">
								<strong>
									<ListGroup.Item variant="primary">Mario Kart TV</ListGroup.Item>
									<ListGroup.Item variant="primary">Mario Kart TV global / popular / recent highlights</ListGroup.Item>
									<ListGroup.Item variant="info">Mario Kart TV highlight download</ListGroup.Item>
									<ListGroup.Item variant="primary">Mario Kart TV highlight upload</ListGroup.Item>
									<ListGroup.Item variant="danger">Mario Kart TV highlight upload on YouTube</ListGroup.Item>
								</strong>
							</ListGroup>
							<hr />
						</div>
					</Tab>
					<Tab eventKey="contact" title="CEMU">
						<Alert variant="info">
							<p>• Use CEMU 2.0-43 experimental or higher</p>
							<p>• {"We don't support piracy and we recommend dumping files from your own console."}</p>
							<p>• {"Files downloaded from the website aren't supported anymore"}</p>
							<p>
								•{" "}
								{
									"If you have unstable frames, plesase don't go online, it ruins the experience for everyone, if it happens too much you will be banned."
								}
							</p>
						</Alert>
						<Alert>
							<p>
								The server is available on console and CEMU, follow the tutorial on{" "}
								<Link href="https://pretendo.network">the website</Link> to get Pretendo Network on your device.
							</p>
						</Alert>
					</Tab>
				</Tabs>
			</form>
		</div>
	);

	/*


    Mario Kart TV highlight automatic search (on mktv boot, global, popular/recent)
    Mario Kart TV highlight download/upload
    Mario Kart TV highlight post reply upload/download
    */
};

export default HomePage;
