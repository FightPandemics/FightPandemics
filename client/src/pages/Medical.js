import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import ImageButton from "components/Button/ImageButton";
import { theme } from "constants/theme";

import { getLocalStorageJson } from "utils/local-storage";

const nearestHospitalUnselected = require("assets/medical-page-images/nearest-hospital-unselected.png");
const nearestHospitalSelected = require("assets/medical-page-images/nearest-hospital-selected.png");
// const symptomsCheckInActive = require("assets/covid19-symptoms-active.png");
const symptomsCheckSelected = require("assets/medical-page-images/covid19-symptoms-selected.svg");
const findHelpUnselected = require("assets/medical-page-images/find-help-selected.svg");
const findHelpSelected = require("assets/medical-page-images/find-help-unselected.svg");

const INITIAL_STATE = {
  emergencyNumber: "",
  country: "",
  errorMessage: null,
  loading: true,
};

const FlexChild = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const StyledWelcome = styled.h2`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.typography.size.large};
  line-height: 3rem;
  margin: 2.5rem auto 0;
  text-align: center;
`;

// const StyledStrapline = styled(StyledWelcome)`
//   font-weight: bold;
//   margin: 0 auto;
// `;

const OnboardingContainer = styled.div`
  margin-top: 4rem;
`;

const needHelpAnswers = getLocalStorageJson("needHelpAnswers") || [];

const getGeoLocation = () => needHelpAnswers?.location;

const Medical = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  //   console.log("render medical page", { props });

  const fetchNumber = () => {
    const emergencyNumber = "IN DEVELOPMENT"; // TODO: figure out v1.1 feature later
    setState({ ...state, loading: false, emergencyNumber });
    localStorage.setItem("emergencyNumber", "IN DEVELOPMENT");
  };

  const fetchGeoData = () => {
    // Defaulting to San Francisco
    // TODO fix geolocation
    const defaultGeolocation = {
      lat: 37.733795,
      lng: -122.446747,
    };
    const geolocation = getGeoLocation() || defaultGeolocation;
    axios
      .get("/api/geo/location-reverse-geocode", { params: geolocation })
      .then((res) => {
        const country = res?.data?.location?.country;
        if (country) {
          setState({ ...state, country });
          localStorage.setItem("country", country);
        }
        fetchNumber();
      })
      .catch((err) => console.error(err));
  };

  const initializeMedicalState = () => {
    const country = getLocalStorageJson("country");
    const emergencyNumber = getLocalStorageJson("emergencyNumber");

    if (!country || !emergencyNumber) fetchGeoData();
    else setState({ ...state, emergencyNumber, country, loading: false });
  };

  useEffect(initializeMedicalState, []);

  return (
    <div className="text-center">
      <h3>Your Local Emergency Number</h3>
      <h1 className="text-primary display-4 font-weight-bolder">
        {state.loading
          ? "Loading..."
          : state.emergencyNumber || state.errorMessage}
      </h1>
      <StyledWelcome level={3} size="xlarge">
        Please Call Your Local Emergency Number
      </StyledWelcome>
      <OnboardingContainer style={{ display: "flex", flexWrap: "wrap" }}>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={nearestHospitalUnselected}
            activeImg={nearestHospitalSelected}
            onClick={() => props.history.push("/nearest-hospital")}
          >
            Nearest Hospitals
          </ImageButton>
        </FlexChild>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={symptomsCheckSelected}
            activeImg={symptomsCheckSelected}
            onClick={() => props.history.push("/symptoms-check")}
          >
            Symptoms Check
          </ImageButton>
        </FlexChild>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={findHelpSelected}
            activeImg={findHelpUnselected}
            onClick={() => props.history.push("/find-help")}
          >
            Find Help
          </ImageButton>
        </FlexChild>
      </OnboardingContainer>
    </div>
  );
};

export default Medical;
