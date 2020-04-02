import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ImageButton from "../components/Button/ImageButton";

const FlexChild = styled.div`
  flex-grow: 1
`

export const Home = () => {
  return (
    <div className="text-center">
      <h4 className="text-light">Welcome to FightPandemics</h4>
      <h2>Help us prevent the spread of COVID-19</h2>
      <p>Pandemics are bound to continue to happen.</p>
      <p>We help you be prepared to stop them.</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <FlexChild>
          <Link to="/need-help">
            <ImageButton
              type="ghost"
              inactiveImg={require("~/assets/thermometer-unselected.svg")}
              activeImg={require("~/assets/thermometer-selected.svg")}
            >
              I need help
            </ImageButton>
          </Link>
        </FlexChild>
        <FlexChild>
          <Link to="/offer-help">
            <ImageButton
              type="ghost"
              inactiveImg={require("~/assets/help-gesture-unselected.svg")}
              activeImg={require("~/assets/help-gesture-selected.svg")}
            >
              I want to help
            </ImageButton>
          </Link>
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
