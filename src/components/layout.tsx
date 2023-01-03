
import React, { Component, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, ListGroup, Offcanvas } from "react-bootstrap";
import { securityManager } from "../common/security/security-manager";
import { useNavigate } from "react-router-dom";

import { IRouteItem, MicroApp } from "../common/micro-app";
import { VscMail } from "react-icons/vsc";

import "./layout.css";

export const ViridiumOffcanvas = (props: any) => {
    let showForm = props.showForm;
    let onHide = props.onHide;
    return (
        <Offcanvas show={showForm.show} placement='end' onHide={() => onHide({ show: false, mode: 'create' })}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{props.title ? props.title : "No Title"}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {props.children}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export const Search = (props: any) => {
    return (
        <div>
            <input className="search-input" placeholder="Search" />
        </div>
    )
}

const NavItem = (props: any) => {
    const navigate = useNavigate();
    let service = props.service;
    return (
        <ListGroup.Item as="li" action onClick={(e: any) => { navigate(`/schema/${service.name}`, { replace: true }); }}>
            <span><img className="nav-icon" src="../resources/green.png" alt="" /> {service.getLabel()}</span>
        </ListGroup.Item>
    )
}

export const ApplicationHeader = (props: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!securityManager.isSignedIn()) {
            navigate(`/login?from=/${props.microApp.getName()}`);
        } 
    }, [navigate]);

    if (securityManager.isSignedIn()) {
        let user = securityManager.getUserContext().user!;
        const ui = () => (
            <Navbar id="application-header" bg="none" className="application-header" expand="lg">
                <Navbar.Brand as='span'>
                      {user.firstName} {user.lastName} - {user.title} 
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Search /> */}
                    </Nav>
                    <Nav className="me-end">
                        <span>Notifications</span>
                        <VscMail className="notifications-icon" />
                    </Nav>
                    <Nav className="me-end">
                        <NavDropdown className="actions-menu" title="Profile" id="profile-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={(e: any) => {
                                securityManager.signout();
                                navigate("/", { replace: true });
                            }}> Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
        return ui();
    } else {
        return <Navbar bg="none" expand="lg">
            <Navbar.Brand as='span'>
                Not signed in
            </Navbar.Brand>
        </Navbar>
    }

}

export const LayoutHeader = (props: any) => {
    const microApp = props.microApp as MicroApp;
    const ui = () => (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img src="../resources/green.png" className="viridium-logo" alt="Layout" ></img>
                <span>{microApp.getTitle()}</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav className="layout-header-end me-end">
                    {
                        microApp.getRouteItems().length > 0 ?
                            microApp.getRouteItems().map((routeItem, idx) => {
                                return <Nav.Link key={"menu_item_" + idx} href={routeItem.route}>{routeItem.name}</Nav.Link>
                            }) : ""
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
    return ui();
}

export interface WrapperProps {
    children?: React.ReactNode
}

export class LayoutBody extends Component<WrapperProps> {
    render() {
        return (
            <div className="home-body">
                {this.props.children}
            </div>
        );
    }
};

export interface BodyNavProps {
    children?: React.ReactNode,
    routeItems: IRouteItem[];
}

export class LayoutBodyNav extends Component<BodyNavProps> {
    render() {
        return (
            <ListGroup as="ul" className="home-body-nav">
                {
                    this.props.routeItems
                        .map((routeItem, idx) => <NavItem service={routeItem} key={"home-body-nav-" + idx}></NavItem>)
                }
            </ListGroup>
        )
    }
}

export class LayoutBodyMain extends Component<WrapperProps> {
    render() {
        return (
            <div className="home-body-main">
                {this.props.children}
            </div>
        )
    }
}

export class LayoutFooter extends Component {
    render() {
        return (
            <div className="home-footer .bg-light">
                Copyright © 2022 VIRIDIUM.AI - All Rights Reserved.
            </div>
        )
    }
}

export const LayoutPage = (props: any) => {
    const microApp: MicroApp = props.microApp;
    const withAppHeader = props.withAppHeader !== undefined ? props.withAppHeader : false;

    const routeItem: IRouteItem = props.routeItem;
    const [showForm, setShowForm] = useState({ show: false, mode: 'create' });

    const listUpdated = () => {

    }
    const showOffcavas = (event: any) => {
        event.preventDefault();
        setShowForm({ show: true, mode: 'create' });
    }

    //UI 
    return (
        <div className={"layout " + microApp.getName()}>
            <LayoutHeader microApp={microApp} routeItem={routeItem} />
            {
                withAppHeader ? <ApplicationHeader microApp={microApp} /> : ""
            }
            <LayoutBody>
                {microApp.getNavItems().length > 0 ? <LayoutBodyNav routeItems={microApp.getNavItems()} /> : ""}
                <LayoutBodyMain>
                    {props.children}
                </LayoutBodyMain>
            </LayoutBody>
            <LayoutFooter />
        </div>
    );
}
