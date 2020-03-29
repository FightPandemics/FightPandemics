import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const Header = () => {
    return (
        <Navbar variant="light" bg="white" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="/assets/logo.svg"
                        width="200"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Fight Pandemics logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <Nav.Link href="#login">Login</Nav.Link>
                    <Nav.Link href="#signup">Signup</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
