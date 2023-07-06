'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav, Spinner } from 'react-bootstrap';
import { usePathname, } from 'next/navigation';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { MdLogin, MdLogout } from 'react-icons/md';
import { isBrowser } from 'react-device-detect';
import { NEXStatus } from './NEXStatus';
import { useState } from 'react';

interface NavigationBarEntryProps {
    name: string;
    path: string;
    desc: string | JSX.Element;
}

const NavigationBarEntry: React.FC<NavigationBarEntryProps> = ({ name, path, desc }) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    const popover = (
        <Popover className="text-center">
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

    const [responseHeaders, setResponseHeaders] = useState<Headers | null>(null);
    const isLoggedIn = responseHeaders && responseHeaders.has("x-mk8-pretendo-imageurl");
    const userName = isLoggedIn && responseHeaders.get("x-mk8-pretendo-username");
    const aclHeader = isLoggedIn && responseHeaders.get("x-mk8-pretendo-acl");
    const isAdmin = aclHeader && parseInt(aclHeader) >= 3;

    const getUserProfileJSX = () => {
        if (responseHeaders) {
            if (isLoggedIn) {
                return (
                    /*
                    <Link href="#" className="nav-link me-5" onClick={() => {
                        fetch('/logout').then(() => window.location.reload());
                    }}>
                        <Image src={responseHeaders.get("x-mk8-pretendo-imageurl") as string} width={48} height={48} alt="Mii profile picture" className="mb-2" />
                        <strong>{responseHeaders.get("x-mk8-pretendo-username")}</strong>
                    </Link>
                    */
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Image src={responseHeaders.get("x-mk8-pretendo-imageurl") as string} width={48} height={48} alt="Mii profile picture" className="mb-2" />
                            <strong>{responseHeaders.get("x-mk8-pretendo-username")}</strong>
                        </div>
                        <Nav.Link href="/logout" className="nav-link ms-3 me-3">
                            <MdLogout size={32} className="text-danger" />
                        </Nav.Link>
                    </div>
                );
            } else {
                return (
                    <Link href={`https://pretendo.network/account/login?redirect=${window.location.origin + pathname}`} className="active nav-link me-5">
                        <strong className="me-2 text-primary">Login<MdLogin size={25} className="ms-2" /></strong>
                    </Link >
                );
            }
        }
        return <Spinner animation="border" role="status" className="me-5" />;
    }

    const pathname = usePathname();
    return (
        <div>
            <NEXStatus responseHeaderCallback={(headers: Headers) => setResponseHeaders(headers)} />
            <Navbar expand="lg" style={{ borderBottom: '1px solid #e2edff', backgroundColor: '#e2edff' }}>
                <Navbar.Brand>
                    <Link href='/' style={{ textDecoration: 'none' }}>
                        <div className="d-flex gap-2 align-items-center ms-3">
                            <div className="p-1">
                                <Image src="/assets/pretendo-logo.png" alt="Pretendo logo" width={35} height={35} />
                            </div>
                            <div className="d-flex flex-column">
                                <span className="text-muted fs-6"><strong>Mario Kart 8 Pretendo website</strong></span>
                            </div>
                        </div>
                    </Link>
                </Navbar.Brand>

                {isBrowser && <div className="ms-2 vr" />}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-between me-3 ms-2">
                    <Nav className="ms-3">
                        <NavigationBarEntry path="/" name="Home" desc="Main page of the website" />
                        <NavigationBarEntry path="/gatherings" name="Gatherings" desc="List of matchmaking sessions (worldwide, regional, friend rooms, tournaments)" />
                        <NavigationBarEntry path="/tournaments" name="Tournaments" desc="List of tournaments" />
                        <NavigationBarEntry path="/rankings" name="Rankings" desc="Time trial rankings" />
                    </Nav>
                    <Nav className="ms-3 justify-content-between align-items-center">
                        {isAdmin && <NavigationBarEntry path="/admin" name="Admin panel" desc="Admin panel" />}
                        {isLoggedIn && <NavigationBarEntry path="/dashboard" name="User data" desc="User dashboard" />}
                        {getUserProfileJSX()}
                    </Nav>
                </Navbar.Collapse>




            </Navbar>
        </div>
    )
}

export default NavigationBar;