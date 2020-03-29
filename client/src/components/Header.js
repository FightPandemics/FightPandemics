import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink  } from 'react-router-dom';

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
                        <Nav.Item><NavLink exact to="/">Home</NavLink></Nav.Item>
                        <Nav.Item><NavLink to="/about">About us</NavLink></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <Nav.Link>Login</Nav.Link>
                    <Nav.Link>Signup</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
