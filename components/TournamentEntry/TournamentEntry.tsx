import styles from './TournamentEntry.module.css'
import { Tournament } from '@/helpers/proto/amkj_service';
import Image from 'next/image';
import { Badge, Card, OverlayTrigger, Popover } from 'react-bootstrap';
import { BsFillPersonFill, BsGlobe, BsSpeedometer2 } from 'react-icons/bs';
import { AiFillShopping } from 'react-icons/ai';
import { RiTeamFill } from 'react-icons/ri';
import { memo } from 'react';

const AMKJ_TOURNAMENT_ICONS: string[] = [
    'Ch_Mro', 'Ch_Lig', 'Ch_Pch', 'Ch_Dsy', 'Ch_Rst',
    'Ch_MroM', 'Ch_Ysi0', 'Ch_Kno', 'Ch_Nok', 'Ch_Hyh0',
    'Ch_Jgm', 'Ch_Knc', 'Ch_MroB', 'Ch_LigB', 'Ch_PchB',
    'Ch_DsyB', 'Ch_RstB', 'Ch_PchG', 'Ch_Kop', 'Ch_Dkg',
    'Ch_Wro', 'Ch_Wlg', 'Ch_Igy', 'Ch_Roy', 'Ch_Lmy',
    'Ch_Lry', 'Ch_Wdy', 'Ch_Ldw', 'Ch_Mtn', 'Ch_Mii',
    'It_Msh', 'It_Msh3', 'It_Kor', 'It_Kor3', 'It_KorR',
    'It_KorR3', 'It_Bnn', 'It_Bnn3', 'It_Flw', 'It_Bom',
    'It_Gso', 'It_MshP', 'It_Kil', 'It_Thn', 'It_Tgz',
    'It_Str', 'It_Coin', 'It_Bmr', 'It_Pkn', 'It_SHorn',
    'It_SP8', 'Kt_StdK', 'Kt_Ten', 'Kt_Ufo', 'Kt_Wld',
    'Kt_StdB', 'Kt_Mgp', 'Kt_StdV', 'Cp_Msh', 'Cp_Flw',
    'Cp_Str', 'Cp_Spc', 'Cp_Kor', 'Cp_Bnn', 'Cp_Knh',
    'Cp_Thn', 'Cl_50', 'Cl_100', 'Cl_150', 'Cl_Mir',
    'Sb_FMro', 'Sb_FLgi', 'Sb_FPch', 'Sb_FYsi', 'Sb_FKno',
    'Sb_FKop', 'Sb_FWro', 'Ot_Bln', 'Ot_Hdl', 'Ot_Flag',
    'Cl_200'
];

const AMKJ_TOURNAMENT_RACE_MODE = ["200cc", "50cc", "100cc", "150cc", "Mirror", "Battle"];
const AMKJ_TOURNAMENT_AVAILABLE_COURSES = ["Base", "Base + DLC 1", "Base + DLC 2", "Base + DLC 1+2", "Only DLC 1+2"];
const AMKJ_REGION_TYPE = ["Invalid", "Global", "Regional"];

function getTournamentTimeWeekly(value: number): string {
    const tournamentDays: number[] = [6, 0, 1, 2, 3, 4, 5];
    const day = tournamentDays[(value >> 16)];
    const hours = Math.floor((value & 0xffff) / 100) % 24;
    const minutes = ((value & 0xffff) % 100) % 60;

    const utcDate = new Date(2023, 6, 5 + day);
    utcDate.getDay()
    utcDate.setUTCHours(hours, minutes);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const formattedDate = formatter.format(utcDate);
    return formattedDate;
}

function getTournamentTimeDaily(value: number): string {
    const hours = Math.floor(value / 100) % 24;
    const minutes = (value % 100) % 60;

    const utcDate = new Date();
    utcDate.setUTCHours(hours, minutes);

    const formattedHours = utcDate.getHours().toString().padStart(2, '0');
    const formattedMinutes = utcDate.getMinutes().toString().padStart(2, '0');

    return `Every day at ${formattedHours}:${formattedMinutes}`;
}

function getTournamentTimeFixed(value: Date): string {
    return value.toLocaleString();
}

const getTournamentTime = (tournament: Tournament): [string, string] => {
    switch (tournament.repeatType) {
        case 1: // Weekly
            return [getTournamentTimeWeekly(tournament.startDayTime), getTournamentTimeWeekly(tournament.endDayTime)];
        case 2: // Daily
            return [getTournamentTimeDaily(tournament.startTime), getTournamentTimeDaily(tournament.endTime)];
        case 3: // Fixed
            if (tournament.startDateTime && tournament.endDateTime) {
                return [getTournamentTimeFixed(new Date(tournament.startDateTime)), getTournamentTimeFixed(new Date(tournament.endDateTime))];
            }
        default:
            return ["Unknown start time", "Unknown end time"];
    }
}

export interface TournamentEntryProps {
    tournament: Tournament;
}

export const TournamentEntry: React.FC<TournamentEntryProps> = memo(
    function TournamentEntry({ tournament }) {
        const [startTime, endTime] = getTournamentTime(tournament);
        
        // Tournament Icon index may be negative or more than icons length. If so, default to `Ch_Mro` 
        const tournamentIconUrl = `/assets/compe_icon/${AMKJ_TOURNAMENT_ICONS[tournament.iconType] ?? 'Ch_Mro'}.png`;

        const isTournamentOfficial = (tournament.attributes[12] == 2);
        
        const raceMode = AMKJ_TOURNAMENT_RACE_MODE[tournament.attributes[2]] ?? "Invalid race mode"
        const availableCourses = AMKJ_TOURNAMENT_AVAILABLE_COURSES[tournament.attributes[9]] ?? "Invalid courses"
        const regionType = AMKJ_REGION_TYPE[tournament.attributes[7]] ?? "Invalid region"

        const tournamentDescPopover = (
            <Popover className="text-center">
                <Popover.Header as="h3">Tournament details</Popover.Header>
                <Popover.Body>
                    <Card>
                        <Card.Header>
                            <div className="d-flex align-items-center justify-content-center">
                                <BsSpeedometer2 size={25} className="me-3 text-primary" />{raceMode}
                            </div>
                        </Card.Header>
                        <Card.Header>
                            <div className="d-flex align-items-center justify-content-center">
                                <AiFillShopping size={25} className="me-3 text-primary" />{availableCourses}
                            </div>
                        </Card.Header>
                        <Card.Header>
                            <div className="d-flex align-items-center justify-content-center">
                                <BsGlobe size={25} className="me-3 text-primary" />{regionType}
                            </div>
                        </Card.Header>
                        <Card.Header>
                            <div className="d-flex align-items-center justify-content-center">
                                <RiTeamFill size={25} className="me-3 text-primary" />{
                                    tournament.attributes[4] == 2 ? (
                                        <strong>
                                            <span className="text-danger me-1">{tournament.redTeam}</span>vs<span className="text-primary ms-1">{tournament.blueTeam}</span>
                                        </strong>
                                    ) : "No teams"
                                }
                            </div>
                        </Card.Header>
                    </Card>
                </Popover.Body>
            </Popover>
        );

        return (
            <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={tournamentDescPopover}>
                <Card className={`border ${isTournamentOfficial ? "border-warning" : "border-dark"}`}>
                    <Card.Header className="text-center">
                        <div className="d-flex d-row justify-content-between">
                            <span className={`fw-bold ${styles.tabular}`}>#{tournament.id}</span>
                            <span className='fw-bold'>Season {tournament.seasonId}</span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex d-row justify-content-between gap-2 ">
                            <div>
                                <Image className="border" src={tournamentIconUrl} width={72} height={72} alt={`Tournament ${tournament.id}`} />
                            </div>
                            <div className="d-flex flex-column text-center align-self-center">

                                {isTournamentOfficial && (
                                    <div className="align-items-center">
                                        <Badge>Official</Badge>
                                    </div>
                                )}
                                <h4>{tournament.name}</h4>
                                <h6>{tournament.description}</h6>
                            </div>
                            <div className="align-self-center">
                                <BsFillPersonFill size={25} />{tournament.totalParticipants}
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-center">Start: <strong>{startTime}</strong></Card.Footer>
                    <Card.Footer className="text-center">End: <strong>{endTime}</strong></Card.Footer>
                    <Card.Footer className="text-center">Community code: <strong>{tournament.communityCode.match(/\d{4}/g)?.join('-')}</strong></Card.Footer>
                </Card>
            </OverlayTrigger>
        )
    }
)