import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ImageButton from "../components/Button/ImageButton";

const needHelpInactive = require("../assets/thermometer-unselected.svg");
const needHelpActive = require("../assets/thermometer-selected.svg");
const offerHelpInactive = require("../assets/help-gesture-unselected.svg");
const offerHelpActive = require("../assets/help-gesture-selected.svg");

const FlexChild = styled.div`
  flex-grow: 1;
`;

export const Home = (props) => {
  console.log("render home", { props });
  return (
    <div className="text-center">
      <h4 className="text-light">Welcome to FightPandemics</h4>
      <h2>Help us prevent the spread of COVID-19</h2>
      <p>Pandemics are bound to continue to happen.</p>
      <p>We help you be prepared to stop them.</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={needHelpInactive}
            activeImg={needHelpActive}
            onClick={() => props.history.push("/need-help")}
          >
            I need help
          </ImageButton>
        </FlexChild>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={offerHelpInactive}
            activeImg={offerHelpActive}
            onClick={() => props.history.push("/offer-help")}
          >
            I want to help
          </ImageButton>
        </FlexChild>
      </div>
      <p>
        <Link to="/AirTableCOVID">
          {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
          Skip
        </Link>
      </p>
    </div>
  );
};
