import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mq, theme } from "constants/theme";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import nextArrow from "assets/icons/next-arrow.svg";
import backArrow from "assets/icons/back-arrow.svg";

const desktopBreakpoint = mq.tablet.narrow.maxWidth;

const StyledWizardNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  width: 100%;

  & + div {
    display: flex;
    flex-flow: row wrap;
    max-height: calc(100% - 8rem); /* align-items: stretch; */

    & > div {
      min-height: 100%;
    }
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    display: flex;
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  color: black;
  display: flex;
  flex-flow: row no-wrap;
  align-items: center;
  justify-content: flex-start;
  width: 50%;

  p {
    margin: 1rem;
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 19.2rem;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
  }
`;

const NextButtonWrapper = styled(ButtonWrapper)`
  background-color: ${theme.colors.royalBlue};
  width: 40%;
  color: white;
  border-radius 5rem;
  padding: 0 .5rem;
  justify-content: center;

  @media screen and (max-width: ${desktopBreakpoint}) {
  width: 19.2rem;
  font-size: 1.8rem;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 6.8rem;
    height: 6.8rem;
    p {
      display: none;
    }
    img {
      height: 1.7rem !important;
      margin: 0 !important;
    }
  }
`;

const PrevButton = styled(SvgIcon)`
  cursor: pointer;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: 1.7rem !important;
    margin: 2.55rem 0 !important;
    & + p {
      display: none;
    }
  }
`;

const NextButton = styled(SvgIcon)`
  cursor: pointer;
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    {currentStep > 1 ? (
      <ButtonWrapper onClick={previousStep}>
        <PrevButton
          src={backArrow}
          a11yTitle={`Navigate to step ${currentStep - 1}`}
        />
        <p>Back</p>
      </ButtonWrapper>
    ) : (
      <ButtonWrapper>
        <Link to={"/"}>
          <PrevButton src={backArrow} a11yTitle="Navigate to the homepage" />{" "}
          <p>Back</p>
        </Link>
      </ButtonWrapper>
    )}
    {currentStep < totalSteps && (
      <NextButtonWrapper onClick={nextStep}>
        <p>Next</p>
        <NextButton src={nextArrow} />
      </NextButtonWrapper>
    )}
  </StyledWizardNav>
);

export default WizardNav;
