import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ImageButton from "components/Button/ImageButton";
import { theme, mq } from "constants/theme";
import TextLabel from "components/Typography/TextLabel";
import GTM from "constants/gtm-tags";

const { typography } = theme;
const { black, royalBlue, white, offWhite } = theme.colors;

const needHelpInactive = require("assets/thermometer-unselected.svg");
const needHelpActive = require("assets/thermometer-selected.svg");
const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const offerHelpActive = require("assets/help-gesture-selected.svg");

const FlexChild = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const StyledIntro = styled.div`
  @media screen and ${mq.phone.wide.max} {
    margin-top: 4rem;
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-image: ${theme.backgrounds.primary};
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    padding: 16rem 7rem 16rem 5rem;
  }

  @media only screen and ${mq.desktop.medium.minWidth} {
    padding: 20rem 7rem 20rem 5rem;
  }
`;

const MainContainer = styled.div`
  @media only screen and ${mq.tablet.narrow.min} {
    background: ${offWhite};
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and ${mq.phone.wide.max} {
    display: block;
  }
`;

const StyledWelcome = styled.h1`
  text-align: left;
  margin: 0 0 7rem 0;
  font-family: ${typography.font.family.display}, sans-serif;
  font-style: normal;

  @media only screen and ${mq.phone.wide.max} {
    font-size: ${typography.size.xlarge};
    margin: 2.5rem auto;
    font-weight: bold;
    text-align: center;
    color: ${black};
  }

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${typography.heading.one};
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    font-size: 5rem;
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    font-size: 6rem;
  }
`;

const StyledStrapline = styled(StyledWelcome)`
  color: ${white};
  width: 90%;
  text-align: left;
  font-weight: bolder;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-size: ${typography.heading.one};
  @media only screen and ${mq.phone.narrow.max} {
    text-align: center;
    margin: 0 auto 1.5rem auto;
  }
`;

const IntroText = styled.div`
  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    width: 90%;
  }
`;

const StyledP = styled.p`
  font-size: ${typography.size.xsmall};
  text-align: left;
  color: ${white};
  margin: 0.5rem 0;

  @media only screen and ${mq.phone.wide.max} {
    font-family: ${typography.font.family.display}, sans-serif;
    font-size: ${typography.size.medium};
    text-align: center;
    color: ${black};
    line-height: 2rem;
    letter-spacing: 0rem;
    margin: 1rem 0;
  }

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${typography.size.large};
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    font-size: ${typography.size.xlarge};
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    font-size: ${typography.size.xxlarge};
  }
`;

const OnboardingContainer = styled.div`
  // display: flex;
  // flexWrap: wrap;
  width: 100%;
  margin: auto 0;

  @media only screen and ${mq.phone.wide.max} {
    margin-top: 6rem;
  }
`;

const StyleLink = styled.p`
  color: ${royalBlue};
  font-size: ${typography.size.large};
  font-family: ${typography.font.family.display};
  font-weight: 500;
  margin-top: 4rem;
`;

const Home = (props) => {
  return (
    <MainContainer className="text-center home">
      <StyledIntro>
        <IntroText>
          <TextLabel
            color="white"
            block="true"
            size={theme.typography.size.xlarge}
            weight="500"
          >
            FightPandemics
          </TextLabel>

          <StyledStrapline level={2} margin="none">
            A place to offer and request help
          </StyledStrapline>
          <StyledP>Pandemics will continue to happen.</StyledP>
          <StyledP>We help communities prepare and respond.</StyledP>
        </IntroText>
      </StyledIntro>

      <>
        <OnboardingContainer>
          <FlexChild>
            <ImageButton
              id={GTM.homePage.prefix + GTM.homePage.requestHelp}
              type="ghost"
              inactiveImg={needHelpInactive}
              activeImg={needHelpActive}
              onClick={() => props.history.push("/need-help")}
            >
              Request Help
            </ImageButton>
          </FlexChild>
          <FlexChild>
            <ImageButton
              id={GTM.homePage.prefix + GTM.homePage.offerHelp}
              type="ghost"
              inactiveImg={offerHelpInactive}
              activeImg={offerHelpActive}
              onClick={() => props.history.push("/offer-help")}
            >
              Offer Help
            </ImageButton>
          </FlexChild>

          <Link to="/feed">
            <StyleLink id={GTM.homePage.prefix + GTM.homePage.viewCommPost}>
              View Help Board
            </StyleLink>
          </Link>
        </OnboardingContainer>
      </>
    </MainContainer>
  );
};

export default Home;
