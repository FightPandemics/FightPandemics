import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink  } from 'react-router-dom';

import { useAuth0 } from "../react-auth0-spa";
import logo from '../assets/logo.svg';

export const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <Navbar variant="light" bg="white" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        width="210"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Fight Pandemics logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Item><NavLink exact to="/">Home</NavLink></Nav.Item>
                        <Nav.Item><NavLink to="/about">About us</NavLink></Nav.Item>
                        <Nav.Item><NavLink to="/medical">Medical Info</NavLink></Nav.Item>
                    </Nav>
                    <Nav>
                        {!isAuthenticated && (<Nav.Item><Nav.Link onClick={() => loginWithRedirect({})}>Login</Nav.Link></Nav.Item>)}
                        {!isAuthenticated && (<Nav.Item><Nav.Link onClick={() => loginWithRedirect({})}>Signup</Nav.Link></Nav.Item>)}
                        {isAuthenticated && <Nav.Item><Nav.Link onClick={() => logout()}>Log out</Nav.Link></Nav.Item>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
