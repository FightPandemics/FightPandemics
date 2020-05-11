import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ImageButton from "components/Button/ImageButton";
import { theme, mq } from "constants/theme";

const needHelpInactive = require("assets/thermometer-unselected.svg");
const needHelpActive = require("assets/thermometer-selected.svg");
const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const offerHelpActive = require("assets/help-gesture-selected.svg");

const FlexChild = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const StyledIntro = styled.div`
  @media screen and ${mq.phone.narrow.max} {
    margin-top: 4rem;
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    background: linear-gradient(337.81deg, #425af2 3.41%, #677cf2 98.66%);
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    padding: 16rem 7rem 16rem 5rem;
    min-height: calc(100vh - 124px);
  }

  @media only screen and ${mq.desktop.medium.minWidth} {
    padding: 20rem 7rem 20rem 5rem;
    height: 100vh;
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media only screen and ${mq.phone.narrow.max} {
    display: block;
  }
`;

const StyledWelcome = styled.h2`
  font-size: ${theme.typography.heading.three};
  text-align: left;
  margin: 0 0 7rem 0;
  font-family: ${theme.typography.font.family.display}, sans-serif;
  font-style: normal;

  @media only screen and ${mq.phone.narrow.max} {
    font-size: ${theme.typography.size.large};
    font-weight: 300;
    margin: 2.5rem auto 0;
    text-align: center;
  }

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${theme.typography.heading.one};
    font-weight: bold;
    margin: 1.5rem 0;
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    font-size: 5rem;
    margin: 2.5rem 0;
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    font-size: 6rem;
  }
`;

const StyledStrapline = styled(StyledWelcome)`
  color: white;
  line-height: 7rem;
  width: 90%;
  text-align: left;

  @media only screen and ${mq.phone.narrow.max} {
    text-align: center;
    color: ${theme.colors.darkerGray};
  }
`;

const IntroText = styled.div`
  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    width: 90%;
  }
`;

const StyledP = styled.p`
  font-size: ${theme.typography.size.xsmall};
  text-align: left;
  color: white;

  @media only screen and ${mq.phone.narrow.max} {
    font-family: ${theme.typography.font.family.display}, sans-serif;
    font-size: ${theme.typography.size.small};
    text-align: center;
    color: ${theme.colors.darkerGray};
    letter-spacing: 0.01rem;
    margin: 0;
  }

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${theme.typography.size.large};
    line-height: 2rem;
    margin: 0.5rem 0;
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    font-size: ${theme.typography.size.xlarge};
    line-height: 2.5rem;
    margin: 1rem 0;
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    font-size: ${theme.typography.size.xxlarge};
  }
`;

const OnboardingContainer = styled.div`
  // display: flex;
  // flexWrap: wrapgit ;
  width: 100%;
  margin: auto 0;

  @media only screen and ${mq.phone.narrow.max} {
    margin-top: 4rem;
  }
`;

const Home = (props) => {
  return (
    <MainContainer className="text-center">
      <StyledIntro>
        <IntroText>
          <StyledP>FightPandemics</StyledP>
          <StyledStrapline level={2} margin="none">
            A place to give and get help
          </StyledStrapline>
          <StyledP>Pandemics will continue to happen.</StyledP>
          <StyledP>We help communities prepare and respond.</StyledP>
        </IntroText>
      </StyledIntro>

      <>
        <OnboardingContainer>
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
        </OnboardingContainer>
      </>
    </MainContainer>
  );
};

export default Home;
