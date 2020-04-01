import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa";
import logo from "../assets/logo.svg";
import Logo from "./Logo";

export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const renderAuthSection = () => {
    if (isAuthenticated) {
      return (
        <>
          <Nav.Item>
            <Nav.Link onClick={() => loginWithRedirect({})}>Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => loginWithRedirect({})}>Signup</Nav.Link>
          </Nav.Item>
        </>
      );
    }
    return (
      <Nav.Item>
        <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <Navbar variant="light" bg="white" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Item>
              <NavLink exact to="/">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/about">About us</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/medical">Medical Info</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/AirTableCOVID">Coronovirus Resources</NavLink>
            </Nav.Item>
          </Nav>
          <Nav>{renderAuthSection()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
