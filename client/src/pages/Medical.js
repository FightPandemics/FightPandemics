import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getLocalStorageJson } from "../utils/local-storage";

import { Nav, Button } from "react-bootstrap";

const CONTAINER_STYLES = {
  marginTop: "30px",
  width: "600px",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between"
};

export const Medical = () => {
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

  const [state, setState] = useState(INITIAL_STATE);
  const fetchData = () => {
    const geolocation = getGeoLocation();
    axios
      .post("/api/geo/country", geolocation)
      .then(res => setState({ ...state, country: res.data }))
      .catch(err => console.log(err));
  };
  useEffect(fetchData, []);
  console.log({ state });
  return (
    <div className="text-center mx-auto" style={CONTAINER_STYLES}>
      <h5>Local Emergency Number</h5>
      <h1 className="text-primary display-4 font-weight-bolder">911</h1>
      <div style={{ display: "flex", margin: "30px 10px 10px 50px" }}>
        <div style={{ display: "flex", margin: "10px 100px" }}>
          <div style={{ flexGrow: 1, marginRight: "16px" }}>
            <Link to="/nearest-hospital">
              <Button block variant="primary">
                Nearest Hospitals
              </Button>
            </Link>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Link to="/symptoms-check">
              <Button block variant="light">
                Symptoms check
              </Button>
            </Link>
          </div>
          <div style={{ flexGrow: 1, marginLeft: "16px" }}>
            <Link to="/find-help">
              <Button block variant="primary">
                Find Help
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
