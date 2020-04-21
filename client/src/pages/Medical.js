// import { getAirtableRecord } from "../utils/airtable";
// import { getLocalStorageJson } from "../utils/local-storage";

// const CONTAINER_STYLES = {
//   marginTop: "30px",
//   width: "600px",
//   flexDirection: "column",
//   alignItems: "stretch",
//   justifyContent: "space-between",
// };

// const INITIAL_STATE = {
//   emergencyNumber: "",
//   country: "",
//   errorMessage: null,
//   loading: true,
// };

// const needHelpAnswers = getLocalStorageJson("needHelpAnswers") || [];
// console.log({ needHelpAnswers });

// const getGeoLocation = () => needHelpAnswers?.location;

// export const Medical = () => {
//   const [state, setState] = useState(INITIAL_STATE);

//   const fetchNumber = (countryName) => {
//     getAirtableRecord(countryName, "Country").then((record) => {
//       const errorMessage =
//         "Sorry, we could not locate the emergency number for your country.";
//       if (!record) return setState({ ...state, loading: false, errorMessage });

//       const emergencyNumber = record.fields.Ambulance;
//       setState({ ...state, emergencyNumber, loading: false });
//       localStorage.setItem("emergencyNumber", emergencyNumber);
//     });
//   };

//   const fetchGeoData = () => {
//     const geolocation = getGeoLocation();
//     axios
//       .get("/api/geo/country", geolocation) // TODO we need to authenticate
//       .then((res) => {
//         setState({ ...state, country: res.data });
//         localStorage.setItem("country", JSON.stringify(res.data));

//         fetchNumber(res?.data?.name);
//       })
//       .catch((err) => console.error(err));
//   };

//   const initializeMedicalState = () => {
//     const country = getLocalStorageJson("country");
//     const emergencyNumber = getLocalStorageJson("emergencyNumber");

//     if (!country || !emergencyNumber) fetchGeoData();
//     else setState({ ...state, emergencyNumber, country, loading: false });
//   };

//   useEffect(initializeMedicalState, []);

//   return (
//     <div className="text-center mx-auto" style={CONTAINER_STYLES}>
//       <h5>Local Emergency Number</h5>
//       <h1 className="text-primary display-4 font-weight-bolder">
//         {state.loading
//           ? "Loading..."
//           : state.emergencyNumber || state.errorMessage}
//       </h1>
//       <div style={{ display: "flex", margin: "30px 10px 10px 50px" }}>
//         <Link
//           to="/nearest-hospital"
//           className="btn btn-outline-info mb-3 mr-4 float-left"
//         >
//           Nearest Hospitals
//         </Link>
//         <Link
//           to="/symptoms-check"
//           className="btn btn-outline-info mb-3 mr-4 float-left"
//         >
//           Symptoms check
//         </Link>
//         <Link to="/find-help" className="btn btn-outline-info mb-3 float-left">
//           Find Help
//         </Link>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Heading } from "grommet";

import ImageButton from "../components/Button/ImageButton";
import { theme } from "../constants/theme";

import { getAirtableRecord } from "../utils/airtable";
import { getLocalStorageJson } from "../utils/local-storage";

const nearestHospitalUnselected = require("../../src/assets/medical-page-images/nearest-hospital-unselected.png");
const nearestHospitalSelected = require("../../src/assets/medical-page-images/nearest-hospital-selected.png");
// const symptomsCheckInActive = require("../assets/covid19-symptoms-active.png");
const symptomsCheckSelected = require("../../src/assets/medical-page-images/covid19-symptoms-selected.svg");
const findHelpUnselected = require("../../src/assets/medical-page-images/find-help-selected.svg");
const findHelpSelected = require("../../src/assets/medical-page-images/find-help-unselected.svg");

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

const StyledWelcome = styled(Heading)`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.typography.size.large};
  line-height: 3rem;
  margin: 2.5rem auto 0;
  text-align: center;
`;

const StyledStrapline = styled(StyledWelcome)`
  font-weight: bold;
  margin: 0 auto;
`;

const OnboardingContainer = styled.div`
  margin-top: 4rem;
`;

const needHelpAnswers = getLocalStorageJson("needHelpAnswers") || [];
console.log({ needHelpAnswers });

const getGeoLocation = () => needHelpAnswers?.location;

export const Medical = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  console.log("render medical page", { props });

  const fetchNumber = (countryName) => {
    getAirtableRecord(countryName, "Country").then((record) => {
      const errorMessage =
        "Sorry, we could not locate the emergency number for your country.";
      if (!record) return setState({ ...state, loading: false, errorMessage });

      const emergencyNumber = record.fields.Ambulance;
      setState({ ...state, emergencyNumber, loading: false });
      localStorage.setItem("emergencyNumber", emergencyNumber);
    });
  };

  const fetchGeoData = () => {
    const geolocation = getGeoLocation();
    axios
      .post("/api/geo/country", geolocation)
      .then((res) => {
        setState({ ...state, country: res.data });
        localStorage.setItem("country", JSON.stringify(res.data));

        fetchNumber(res?.data?.name);
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
