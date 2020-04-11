import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Heading } from "grommet";

import ImageButton from "../components/Button/ImageButton";
import { theme } from "../constants/theme";

const needHelpInactive = require("../assets/thermometer-unselected.svg");
const needHelpActive = require("../assets/thermometer-selected.svg");
const offerHelpInactive = require("../assets/help-gesture-unselected.svg");
const offerHelpActive = require("../assets/help-gesture-selected.svg");

const FlexChild = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const StyledWelcome = styled(Heading)`
  font-family: "Poppins", sans-serif;
  /* font-size: ${theme.typography.heading.four}; */
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.typography.size.large};
  line-height: 3rem;
  margin: 3.6rem auto 0;
  text-align: center;
`;

const StyledStrapline = styled(StyledWelcome)`
  font-size: ${theme.typography.size.xlarge};
  font-weight: bold;
  margin: 0 auto;
`;

const StyledP = styled.p`
  font-family: ${theme.typography.font.family.display}, sans-serif;
  font-size: ${theme.typography.size.medium};
  line-height: 2.1rem;
  margin: 0;
`;

const OnboardingContainer = styled.div`
  margin-top: 4rem;
`;

export const Home = (props) => {
  console.log("render home", { props });
  return (
    <div className="text-center">
      <StyledWelcome level={4} size="xlarge">
        Welcome to FightPandemics
      </StyledWelcome>
      <StyledStrapline level={2} margin="none">
        Help us prevent the spread of COVID-19
      </StyledStrapline>
      <StyledP>Pandemics are bound to continue to happen.</StyledP>
      <StyledP>We help you be prepared to stop them.</StyledP>
      <OnboardingContainer style={{ display: "flex", flexWrap: "wrap" }}>
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
      </OnboardingContainer>
      <p>
        <Link to="/AirTableCOVID">
          {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
          Skip
        </Link>
      </p>
    </div>
  );
};
