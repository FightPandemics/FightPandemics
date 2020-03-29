import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
const CONTAINER_STYLES = {
    marginTop: "30px",
    width: "600px",
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
};

export const Medical = () => {
  return (
      <div className="text-center mx-auto" style={CONTAINER_STYLES}>
          <h5>Local Emergency Number</h5>
          <h1 className="text-primary display-4 font-weight-bolder">911</h1>

          <div style={{ display: "flex", margin: "30px 10px 10px 50px" }}>
            <Nav variant="med-info">
              <Nav.Item>
                <Nav.Link>Nearest Hospitals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Symptoms Check</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Find Help</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
      </div>
  );
}
