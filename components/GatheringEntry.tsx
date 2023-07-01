import { Gathering } from '@/helpers/proto/amkj_service';
import { Card, OverlayTrigger, Popover } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export interface GatheringEntryProps {
    gathering: Gathering;
}

interface Player {
    pid: number;
    guests: number;
}

export const GatheringEntry: React.FC<GatheringEntryProps> = ({ gathering }) => {

    const playerList: Player[] = [];
    gathering.players.forEach((player) => {
        const res = playerList.find(p => p.pid === Math.abs(player));
        if (res) {
            res.guests += 1;
        } else {
            playerList.push({ pid: player, guests: 0 });
        }
    });

    console.log(playerList);

    const popover = (
        <Popover id="popover-basic" className="text-center">
            <Popover.Body>
                <ul>
                    {
                        playerList.map((player, idx) => {
                            return <li key={`${gathering.gid}_${idx}`}>PID {player.pid} {(player.guests > 0) ? ` (+${player.guests} guest)` : ""}</li>;
                        })
                    }
                </ul>
            </Popover.Body>
        </Popover>
    );

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header className="text-center">Gathering {gathering.gid}</Card.Header>
                <Card.Body>

                </Card.Body>
                <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={popover}>
                    <Card.Header className="text-center">{gathering.players.length} player{gathering.players.length > 1 && 's'}</Card.Header>
                </OverlayTrigger>
            </Card>
        </div>
    )
}