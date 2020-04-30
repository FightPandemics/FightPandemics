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

  @media only screen and (min-width: 600px) {  
    background-color: ${theme.colors.royalBlue};
    border-radius: 1rem;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height:100%;
    padding: 16rem 7rem 16rem 5rem;
  }

  @media only screen and (min-width: 1440px) {  
    padding: 20rem 7rem 20rem 5rem;
  }
`;

const MainContainer = styled.div`
  @media only screen and (min-width: 600px){
    display:flex
    
  }
`;

const StyledWelcome = styled(Heading)`
  font-family: ${theme.typography.font.family.display}, sans-serif;
  font-size: ${theme.typography.size.large};
  font-style: normal;
  font-weight: 300;
  margin: 2.5rem auto 0;
  text-align: center;

  @media only screen and (min-width: 600px) {  
    font-size: ${theme.typography.heading.three};
    text-align: left;
    margin: 0 0 7rem 0;
  }

  @media only screen and (min-width: 1024px) {  
    font-size: ${theme.typography.heading.one};
  }

  @media only screen and (min-width: 1280px) {  
    font-size: 5rem;
  }

  @media only screen and (min-width: 1440px) {  
    font-size: 6rem;
  }
`;


const StyledStrapline = styled(StyledWelcome)`
  font-weight: bold;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  @media only screen and (min-width: 600px){
    color: white;
    line-height: 7rem;
    width: 90%;
    text-align: left;
  }

`;

const IntroText = styled.div`
@media only screen and (min-width: 600px){
  width: 90%;
}
`;

const StyledP = styled.p`
  font-family: ${theme.typography.font.family.display}, sans-serif;
  font-size: ${theme.typography.size.small};
  color: #000;
  line-height: 4rem;
  letter-spacing: 0rem;
  margin: 0;
  
  @media only screen and (min-width: 600px){
    font-size: ${theme.typography.size.xsmall};
    text-align: left;
    color: white;
  }

  @media only screen and (min-width: 1024px){
    font-size: ${theme.typography.size.medium};
  }

  
  @media only screen and (min-width: 1280px) {  
    font-size: ${theme.typography.size.xlarge};
  }

  @media only screen and (min-width: 1440px){
    font-size: ${theme.typography.size.xxlarge};
  }
`;

const OnboardingContainer = styled.div`
  margin-top: 4rem;

  @media only screen and (min-width: 600px){
    // display: flex;
    // flexWrap: wrapgit ;
    width: 100%;
    margin: auto 0;
  }
`;

export const Home = (props) => {
  console.log("render home", { props });
  return (
    <MainContainer className="text-center">

      <StyledIntro>
        <IntroText>
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
