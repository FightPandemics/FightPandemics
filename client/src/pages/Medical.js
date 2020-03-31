import axios from "axios";
import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getLocalStorageJson } from "../utils/local-storage";

const CONTAINER_STYLES = {
  marginTop: "30px",
  width: "600px",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between",
};

const INITIAL_STATE = {
  emergencyNumber: "",
  country: "",
};

const needHelpAnswers = getLocalStorageJson("needHelpAnswers") || [];
console.log({ needHelpAnswers });

const getGeoLocation = () => {
  return needHelpAnswers?.find((answer) =>
    Object.keys(answer).includes("location")
  )?.location;
};

export const Medical = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const fetchGeoData = () => {
    const geolocation = getGeoLocation();
    axios
      .post("/api/geo/country", geolocation)
      .then((res) => setState({ ...state, country: res.data }))
      .catch((err) => console.error(err));
  };
  useEffect(fetchGeoData, []);
  // todo: fetch number with correct api call
  const fetchNumber = () => {
    axios
      .get(
        `https://api.airtable.com/v0/appx4wP2PAcscbpFz/Projects%20and%20Initiatives?api_key=keyq3sfh3IOH4qf2g`
      )
      .then((res) => setState({ ...state, emergencyNumber: res.data }))
      .catch((err) => console.error(err));
  };
  useEffect(fetchNumber, []);
  console.log({ state });
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
