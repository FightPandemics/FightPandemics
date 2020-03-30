import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Page1 from "./find-help/FindHelp";
import SymptomsCheck from "./symptoms-check/SymptomsCheck";

const CONTAINER_STYLES = {
  marginTop: "30px",
  width: "600px",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between"
};


const INITIAL_STATE = {
  emergencyNumber: '',
  country: '',
};


const needHelpAnswers = localStorage.getItem('needHelpAnswers');
const geolocation = { latitude: 0, longitude: 0 };


const [state, setState] = useState(INITIAL_STATE);
useEffect(() => {
    (async function fetchData() {
        const result = await axios.post('/api/geo/country', { geolocation });
        setState({ ...state, country: result.data });
        console.log({ needHelpAnswers, result });
    })();
}, [geolocation]);

export const Medical = () => {
  return (
    <div className="text-center mx-auto" style={CONTAINER_STYLES}>
      <h5>Local Emergency Number</h5>
      <h1 className="text-primary display-4 font-weight-bolder">911</h1>
      <div style={{ display: "flex", margin: "30px 10px 10px 50px" }}>
        <Nav variant="med-info">
          <Link
            to="/nearest-hospital"
            className="btn btn-outline-info mb-3 mr-4 float-left"
          >
            Nearest Hospitals
          </Link>
          <br />

          <Link
            to="/symptoms-check"
            className="btn btn-outline-info mb-3 mr-4 float-left"
          >
            Symptoms check
          </Link>

          <Link
            to="/find-help"
            className="btn btn-outline-info mb-3 float-left"
          >
            Find Help
          </Link>
        </Nav>
      </div>
    </div>
  );
};
