'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav } from 'react-bootstrap';
import { usePathname, } from 'next/navigation';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { MdLogin } from 'react-icons/md';
import { isBrowser } from 'react-device-detect';

interface NavigationBarEntryProps {
    name: string;
    path: string;
    desc: string | JSX.Element;
}

const NavigationBarEntry: React.FC<NavigationBarEntryProps> = ({ name, path, desc }) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    const popover = (
        <Popover id="popover-basic" className="text-center">
            <Popover.Header as="h3">{name}</Popover.Header>
            <Popover.Body>
                {desc}
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={popover}>
            <Link href={path} className="active nav-link me-5" style={{ fontWeight: (isActive ? 'bold' : 'inherit') }}>
                {name}
            </Link>
        </OverlayTrigger>
    )
}

interface NavigationBarProps { }

const NavigationBar: React.FC<NavigationBarProps> = ({ }) => {
    const pathname = usePathname();
    const getUserProfileJSX = () => {
        /*
        if (statusResponse) {
            if (statusResponse.headers.has("x-mk8-pretendo-imageurl")) {
                return (
                    <Link href="#" className="nav-link me-5" prefetch={false} onClick={() => {
                        fetch('/logout').then(() => window.location.reload());
                    }}>
                        <Image src={statusResponse.headers.get("x-mk8-pretendo-imageurl") as string} width={48} height={48} alt="Mii profile picture" className="mb-2" />
                        <strong>{statusResponse.headers.get("x-mk8-pretendo-username")}</strong>
                    </Link>
                );
            } else {
                return (
                    <Link href={`https://pretendo.network/account/login?redirect=${window.location.origin + pathname}`} className="active nav-link me-5" prefetch={false}>
                        <strong className="me-2">Login</strong>
                        <MdLogin size={25} />
                    </Link>
                );
            }
        }*/
        return <></>;
    }

    return (
        <div>
            <Navbar expand="lg" style={{ borderBottom: '1px solid #e2edff', backgroundColor: '#e2edff' }}>
                <Navbar.Brand>
                    <Link href='/' style={{ textDecoration: 'none' }}>
                        <div className="d-flex gap-2 align-items-center ms-3">
                            <div className="p-1">
                                <Image src="/assets/pretendo-logo.png" alt="Pretendo logo" width={35} height={35} />
                            </div>
                            <div className="d-flex flex-column">
                                <span className="text-muted fs-6">Mario Kart 8 Pretendo website</span>
                            </div>
                        </div>
                    </Link>
                </Navbar.Brand>

                {isBrowser && <div className="ms-2 vr" />}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between me-3 ms-2">
                    <Nav className="ms-3">
                        <NavigationBarEntry path="/" name="Home" desc="Main page of the website" />
                        <NavigationBarEntry path="/gatherings" name="Gatherings" desc="List of matchmaking sessions (worldwide, regional, friend rooms, tournaments)" />
                        <NavigationBarEntry path="/tournaments" name="Tournaments" desc="List of tournaments" />
                        <NavigationBarEntry path="/rankings" name="Rankings" desc="Time trial rankings" />
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    {getUserProfileJSX()}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavigationBar;