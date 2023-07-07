'use client'

import { GetUnlocksResponse } from "@/helpers/proto/amkj_service"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Alert, ListGroup, Spinner } from "react-bootstrap";

const DashboardPage = () => {
    const [userData, setUserData] = useState<GetUnlocksResponse | null>(null);
    const [userDataResponse, setUserDataResponse] = useState<Response | null>(null);

    const AMKJ_CHARACTERS: string[] = [
        'Mario', 'Luigi', 'Peach',
        'Daisy', 'Yoshi', 'Kinopio',
        'Kinopico', 'Nokonoko', 'Koopa',
        'DK', 'Wario', 'Waluigi',
        'Rosetta', 'MetalMario', 'MetalPeach',
        'Jugem', 'Heyho', 'BbMario',
        'BbLuigi', 'BbPeach', 'BbDaisy',
        'BbRosetta', 'Larry', 'Lemmy',
        'Wendy', 'Ludwig', 'Iggy',
        'Roy', 'Morton', 'Mii',
        'TanukiMario', 'Link', 'AnimalBoyA',
        'Shizue', 'CatPeach', 'HoneKoopa',
        'AnimalGirlA'
    ];

    const AMKJ_KART_BODIES: string[] = [
        'K_Std', 'K_Skl', 'K_Ufo', 'K_Sbm',
        'K_Cat', 'K_Fml', 'K_Tri', 'K_Wld',
        'K_Pch', 'K_Ten', 'K_Shp', 'K_Snk',
        'K_Spo', 'K_Gld', 'B_Std', 'B_Fro',
        'B_Mgp', 'B_Big', 'B_Amb', 'B_Mix',
        'B_Kid', 'B_Jet', 'B_Ysi', 'V_Atv',
        'V_Hnc', 'V_Bea', 'K_Gla', 'K_Slv',
        'K_Rst', 'K_Bfl', 'K_Tnk', 'K_Bds',
        'B_Zlb', 'K_A00', 'K_A01', 'K_Btl',
        'K_Pwc', 'B_Sct', 'V_Drb'
    ];

    const AMKJ_KART_TIRES: string[] = [
        'T_Std', 'T_Big', 'T_Sml', 'T_Rng',
        'T_Slk', 'T_Mtl', 'T_Btn', 'T_Ofr',
        'T_Spg', 'T_Wod', 'T_Fun', 'T_Zst',
        'T_Zbi', 'T_Zsm', 'T_Zrn', 'T_Zsl',
        'T_Zof', 'T_Gld', 'T_Gla', 'T_Tri',
        'T_Anm'
    ];

    const AMKJ_KART_GLIDERS: string[] = [
        'G_Std', 'G_Jgm', 'G_Wlo', 'G_Zng',
        'G_Umb', 'G_Prc', 'G_Prf', 'G_Flw',
        'G_Kpa', 'G_Spl', 'G_Ptv', 'G_Gld',
        'G_Hyr', 'G_Pap',
    ];

    const getImageURL = (type: string, idx: number): string => {
        let list: string[] | null = null;
        if (type === "chara") {
            list = AMKJ_CHARACTERS;
        } else if (type === "body") {
            list = AMKJ_KART_BODIES;
        } else if (type === "tire") {
            list = AMKJ_KART_TIRES;
        } else if (type === "glider") {
            list = AMKJ_KART_GLIDERS;
        }

        if (list) {
            if (idx >= list.length) {
                return '/assets/chara/Invalid.png';
            }
            return `/assets/${type}/${list[idx]}.png`;
        }

        return '/assets/chara/Invalid.png';
    }

    useEffect(() => {
        try {
            fetch('/api/admin/userdata', { cache: "no-store" })
                .then((res) => {
                    setUserDataResponse(res);
                    res.json().then((data) => setUserData(data as GetUnlocksResponse));
                });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPageJSX = () => {
        if (userDataResponse) {
            if (userData && userDataResponse.status == 200) {
                if (userData.hasData) {
                    return (
                        <>
                            <Alert>Last update: <strong>{userData.lastUpdate && new Date(userData.lastUpdate).toLocaleString()}</strong></Alert>
                            <div className="mt-3 pb-3 border border-dark border-2">
                                <h2 className="mb-3 mt-2">Driver unlocks</h2>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        userData.driverUnlocks.map((isUnlocked, idx) => {
                                            return <Image src={getImageURL("chara", idx)} width={52} height={52} alt="Driver icon" style={{ opacity: isUnlocked ? '100%' : '40%' }} key={`chara_${idx}`} />;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mt-3 pb-3 border border-dark border-2">
                                <h2 className="mb-3 mt-2">Body unlocks</h2>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        userData.bodyUnlocks.map((isUnlocked, idx) => {
                                            return <Image src={getImageURL("body", idx)} width={100} height={64} alt="Body icon" style={{ opacity: isUnlocked ? '100%' : '40%' }} key={`body_${idx}`} />;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mt-3 pb-3 border border-dark border-2">
                                <h2 className="mb-3 mt-2">Tire unlocks</h2>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        userData.tireUnlocks.map((isUnlocked, idx) => {
                                            return <Image src={getImageURL("tire", idx)} width={100} height={64} alt="Tire icon" style={{ opacity: isUnlocked ? '100%' : '40%' }} key={`tire_${idx}`} />;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mt-3 pb-3 border border-dark border-2">
                                <h2 className="mb-3 mt-2">Glider unlocks</h2>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        userData.wingUnlocks.map((isUnlocked, idx) => {
                                            return <Image src={getImageURL("glider", idx)} width={100} height={64} alt="Glider icon" style={{ opacity: isUnlocked ? '100%' : '40%' }} key={`glider_${idx}`} />;
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    );
                } else {
                    return (<Alert variant="info">{"We don't have your user data! You must at least play once online on the Mario Kart 8 server!"}</Alert>);
                }
            } else {
                return (<Alert variant="danger">An error has occured because the NEX server may be down. Be patient until the issue is fixed! <strong>{`(Error: ${userDataResponse.status} ${userDataResponse.statusText})`}</strong></Alert>);
            }
        } else {
            return (<Spinner animation="border" role="status" />);
        }
    }

    return (
        <>
            <div className="container-fluid mt-5 mb-3 h-100 p-0 d-flex justify-content-center align-items-center">
                <form className="text-center w-100 p-5 bg-light shadow-lg">
                    <h1 className="mb-3">User dashboard</h1>
                    <div>
                        {getPageJSX()}
                    </div>
                </form>
            </div>
        </>
    )
}

export default DashboardPage;