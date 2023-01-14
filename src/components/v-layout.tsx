
import React, { Component, useEffect } from "react";
import { Navbar, Nav, NavDropdown, ListGroup, Offcanvas } from "react-bootstrap";
import { securityManager } from "../common/security/v-security-manager";
import { useNavigate } from "react-router-dom";

import { IMicroApp, IRouteItem, MicroApp } from "../common/v-app";
import { VscMail } from "react-icons/vsc";

import "./v-layout.css";
import { getConfigs } from "../config/v-config";

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

export const ApplicationHeader = (props: { microApp: IMicroApp }) => {
    const navigate = useNavigate();
    let signedIn = securityManager.isSignedIn();
    let headerOps = props.microApp.getHeader();
    const profile = () => {

    }
    const ui = () => (
        headerOps.visible ? <Navbar id="app-header" bg="none" className="v-app-header" expand="lg">
            <Navbar.Brand as='span'>
                {headerOps.title}
            </Navbar.Brand>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {/* <Search /> */}
                </Nav>
                {
                    signedIn ? <>
                        <Nav className="me-end">
                            <span>Notifications</span>
                            <VscMail className="notifications-icon" />
                        </Nav>
                        <Nav className="me-end">
                            <NavDropdown className="actions-menu" title={securityManager.getProfileName()} id="profile-nav-dropdown">
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={(e: any) => {
                                    securityManager.signout();
                                    navigate("/", { replace: true });
                                }}> Sign out</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </> : <></>
                }

            </Navbar.Collapse>
        </Navbar> : <></>
    );
    return ui();

}

export const LayoutHeader = (props: any) => {
    const microApp = props.microApp as MicroApp;
    const configs = getConfigs();
    const ui = () => (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img src="../resources/green.png" className="viridium-logo" alt="Layout" ></img>
                <span>{configs.title}</span>
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
export interface BodyNavProps {
    children?: React.ReactNode,
    routeItems: IRouteItem[];
}

export class LayoutBodyNav extends Component<BodyNavProps> {
    render() {
        return (
            <ListGroup as="ul" className="v-body-nav">
                {
                    this.props.routeItems
                        .map((routeItem, idx) => <NavItem service={routeItem} key={"v-body-nav-" + idx}></NavItem>)
                }
            </ListGroup>
        )
    }
}

export class LayoutFooter extends Component {
    render() {
        return (
            <div className="v-footer .bg-light">
                Copyright © 2022 VIRIDIUM.AI - All Rights Reserved.
            </div>
        )
    }
}

export const LayoutPage = (props: {microApp:IMicroApp, children:any}) => {
    const microApp: MicroApp = props.microApp;
   //  const routeItem: IRouteItem = props.routeItem;
    const navigate = useNavigate();
    useEffect(() => {
        if (microApp.isSecure() && !securityManager.isSignedIn()) {
            navigate(`/login?from=/${props.microApp.getName()}`);
        }
    });

    //UI 
    const ui = () => {
        return (
            <div className="v-layout">
                <LayoutHeader microApp={microApp} />
                <ApplicationHeader microApp={microApp} />
                <div className={`${microApp.getName()} v-body`}>
                    {microApp.getNavItems().length > 0 ? <LayoutBodyNav routeItems={microApp.getNavItems()} /> : ""}
                    {props.children}
                </div>
                <LayoutFooter />
            </div>
        )
    };
    return ui();
}