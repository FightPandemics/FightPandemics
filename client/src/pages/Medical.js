import axios from "axios";
import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

import { getLocalStorageJson } from "../utils/local-storage";

const CONTAINER_STYLES = {
  marginTop: "30px",
  width: "600px",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between"
};

const INITIAL_STATE = {
  emergencyNumber: "",
  country: ""
};

const needHelpAnswers = getLocalStorageJson("needHelpAnswers") || [];

const getGeoLocation = () => {
  if (needHelpAnswers && needHelpAnswers.length) {
    return needHelpAnswers.find(answer =>
      Object.keys(answer).includes("location")
    ).location;
  }
  return undefined;
};

export const Medical = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const fetchData = () => {
    const geolocation = getGeoLocation();
    axios
      .post("/api/geo/country", geolocation)
      .then(res => setState({ ...state, country: res.data }))
      .catch(err => console.log(err));
  };
  useEffect(fetchData, []);

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
};
