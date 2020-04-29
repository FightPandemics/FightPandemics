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

const StyledIntro = styled.div`
  margin-top: 4rem;
`;

const StyledWelcome = styled(Heading)`
  font-family: ${theme.typography.font.family.display}, sans-serif;
  font-size: ${theme.typography.size.large};
  font-style: normal;
  font-weight: 300;
  line-height: 3rem;
  margin: 2.5rem auto 0;
  text-align: center;
`;

const StyledStrapline = styled(StyledWelcome)`
  font-weight: bold;
  margin: 0 auto;
  margin-bottom: 1.5rem;
`;

const StyledP = styled.p`
  font-family: ${theme.typography.font.family.display}, sans-serif;
  font-size: ${theme.typography.size.small};
  color: #000;
  line-height: 2.1rem;
  letter-spacing: 0.1px;
  margin: 0;
`;

const OnboardingContainer = styled.div`
  margin-top: 4rem;
`;

const Home = (props) => {
  console.log("render home", { props });
  return (
    <div className="text-center">
      <StyledIntro>
        <StyledStrapline level={2} margin="none">
          A place to give and get help
        </StyledStrapline>
        <StyledP>Pandemics will continue to happen.</StyledP>
        <StyledP>We help communities prepare and respond.</StyledP>
      </StyledIntro>
      <OnboardingContainer style={{ display: "flex", flexWrap: "wrap" }}>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={needHelpInactive}
            activeImg={needHelpActive}
            onClick={() => props.history.push("/need-help")}
          >
            Need Help
          </ImageButton>
        </FlexChild>
        <FlexChild>
          <ImageButton
            type="ghost"
            inactiveImg={offerHelpInactive}
            activeImg={offerHelpActive}
            onClick={() => props.history.push("/offer-help")}
          >
            Give Help
          </ImageButton>
        </FlexChild>
      </OnboardingContainer>
      <p style={{ marginTop: "2rem" }}>
        <Link
          style={{
            color: theme.colors.royalBlue,
            fontSize: theme.typography.size.large,
            fontFamily: theme.typography.font.family.display,
            fontWeight: "500",
          }}
          to="/feed"
        >
          View Community Postings
        </Link>
      </p>
    </div>
  );
};

export default Home;
