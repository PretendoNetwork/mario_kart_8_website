import { Gathering } from '@/helpers/proto/amkj_service';
import { Card, OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { BsGlobe, BsController } from 'react-icons/bs';
import { AiFillShopping } from 'react-icons/ai';

export interface GatheringEntryProps {
    gathering: Gathering;
}

export const GatheringEntry: React.FC<GatheringEntryProps> = ({ gathering }) => {

    const AMKJ_GATHERING_REGIONS: string[] = ["Worldwide", "Japan", "America", "Europe", "Korea", "China", "Taiwan"];
    const AMKJ_GATHERING_GAMEMODES: string[] = ["VS Race", "Battle", "<Tournaments>", "Friend room"];
    const AMKJ_GATHERING_DLCS: string[] = ["No DLC", "DLC 1", "DLC 2", "DLC 1+2"];

    function getRegion(): string {
        if (gathering.attributes[3] < 0 || gathering.attributes[3] >= AMKJ_GATHERING_REGIONS.length) {
            return "Unknown region";
        }
        return AMKJ_GATHERING_REGIONS[gathering.attributes[3]];
    }

    function getGamemode(): string {
        if (gathering.gameMode < 0 || gathering.gameMode >= AMKJ_GATHERING_GAMEMODES.length) {
            return "Unknown game mode";
        }
        if (gathering.gameMode == 2) {
            return `Playing in tournament ${gathering.attributes[0]}`;
        } else {
            return AMKJ_GATHERING_GAMEMODES[gathering.gameMode];
        }
    }

    function getDlcStatus(): string {
        let dlcStatus = gathering.attributes[4] & 0b11;
        if (dlcStatus < 0 || dlcStatus >= AMKJ_GATHERING_DLCS.length) {
            return "Unknown DLCs";
        }
        return AMKJ_GATHERING_DLCS[dlcStatus];
    }

    const popover = (
        <Popover id="popover-basic" className="text-center">
            <Popover.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{"Player (PID)"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gathering.players.map((player, idx) => {
                            return (
                                <tr key={`gat${gathering.gid}_p${idx}`}>
                                    <td>{idx + 1}</td>
                                    <td>{(player < 0) ? `Guest of ${Math.abs(player)}` : `${player}`}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Popover.Body>
        </Popover>
    );

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header className="text-center"><strong>Gathering #{gathering.gid}</strong></Card.Header>
                <Card.Header className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <BsGlobe size={25} className="me-3 text-primary" />{getRegion()}
                    </div>
                </Card.Header>
                <Card.Header className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <BsController size={25} className="me-3 text-primary" />{getGamemode()}
                    </div>
                </Card.Header>
                <Card.Header className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <AiFillShopping size={25} className="me-3 text-primary" />{getDlcStatus()}
                    </div>
                </Card.Header>
                <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={popover}>
                    <Card.Footer className="text-center">{gathering.players.length} / {gathering.maxParticipants} players</Card.Footer>
                </OverlayTrigger>
            </Card>
        </div>
    )
}