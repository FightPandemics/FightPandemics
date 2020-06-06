import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mq, theme } from "constants/theme";
import LeftRightIconButton from "components/Button/LeftRightIconButton";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import nextArrow from "assets/icons/next-arrow.svg";
import backArrow from "assets/icons/back-arrow.svg";

const desktopBreakpoint = mq.tablet.narrow.maxWidth;

const { royalBlue, white } = theme.colors;

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
    margin: 0 auto 1rem;
    width: 40rem;
  }
`;

const BackButton = styled(LeftRightIconButton)`
  align-items: center;
  background-color: transparent;
  color: ${royalBlue};
  cursor: pointer;
  display: flex;
  height: 6.8rem;
  justify-content: center;
  width: 6.8rem;

  & span {
    display: none;
  }
  @media screen and (min-width: ${desktopBreakpoint}) {
    height: 4.8rem;
    width: 19.2rem;
    & span {
      display: inline;
    }
  }
`;

const BackText = styled.span`
  margin-left: 3rem;
`;

const NextButton = styled(LeftRightIconButton)`
  align-items: center;
  background-color: ${royalBlue};
  color: ${white};
  cursor: pointer;
  display: flex;
  height: 6.8rem;
  justify-content: center;
  width: 6.8rem;

  & span {
    display: none;
  }
  @media screen and (min-width: ${desktopBreakpoint}) {
    font-weight: bold;
    height: 4.8rem;
    width: 19.2rem;

    & span {
      display: inline;
    }
  }
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    {currentStep > 1 ? (
      <BackButton onClick={previousStep}>
        <SvgIcon
          src={backArrow}
          title={`Navigate to step ${currentStep - 1}`}
        />
        <BackText>Back</BackText>
      </BackButton>
    ) : (
      <BackButton>
        <Link to={"/"}>
          <SvgIcon src={backArrow} title="Navigate to the homepage" />{" "}
          <BackText>Back</BackText>
        </Link>
      </BackButton>
    )}
    {currentStep < totalSteps && (
      <NextButton onClick={nextStep}>
        <span>Next</span>
        <SvgIcon src={nextArrow} />
      </NextButton>
    )}
  </StyledWizardNav>
);

export default WizardNav;
