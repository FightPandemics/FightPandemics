import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-spa";
//import { NavLink  } from 'react-router-dom';

export const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <Navbar variant="light" bg="white" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="../assets/logo.svg"
                        width="200"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Fight Pandemics logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Nav>
                    {!isAuthenticated && (<Nav.Link onClick={() => loginWithRedirect({})}>Login</Nav.Link>)}
                    {!isAuthenticated && (<Nav.Link onClick={() => loginWithRedirect({})}>Signup</Nav.Link>)}
                    {isAuthenticated && <Nav.Link onClick={() => logout()}>Log out</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    );
}
