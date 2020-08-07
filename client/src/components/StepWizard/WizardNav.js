import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mq, theme } from "constants/theme";
import LeftRightIconButton from "components/Button/LeftRightIconButton";
import GTM from "constants/gtm-tags";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import nextArrow from "assets/icons/next-arrow.svg";
import backArrow from "assets/icons/back-arrow.svg";

const desktopBreakpoint = mq.tablet.narrow.maxWidth;

const { royalBlue, white } = theme.colors;

export const StyledWizardNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 2em;
  margin: 0 auto;
  width: 35rem;
  max-width: 100%;

  & + div {
    display: flex;
    flex-flow: row wrap;
    max-height: calc(100% - 8rem); /* align-items: stretch; */

    & > div {
      min-height: 100%;
    }
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 40rem;
  }
`;

export const BackButton = styled(LeftRightIconButton)`
  align-items: center;
  background-color: transparent;
  color: ${royalBlue};
  cursor: pointer;
  display: flex;
  height: 6.8rem;
  justify-content: center;
  width: 6.8rem;
  margin: auto;
  margin-right: 1rem;


  & span {
    display: none;
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    height: 4.8rem;
    width: 19.2rem;
    transition: all 0.1s;

    & span {
      display: inline;
    }

    &:hover {
      img {
        // values below are equivalent to royalBlue
        filter: invert(0.5) sepia(63) saturate(3) hue-rotate(207deg);
      }
    }

    &:active {
      transform: translateY(0.1rem);
    }
  }
`;

export const BackText = styled.span`
  margin-left: 3rem;
`;

const NextButton = styled(LeftRightIconButton)`
  display: flex;
  background-color: ${royalBlue};
  color: ${white};
  cursor: pointer;
  height: 6.8rem;
  justify-content: center;
  align-items: center;
  width: 6.8rem;
  margin: auto;
  margin-left: 2rem;

  html body &.am-button {
    border: 0.2rem solid ${royalBlue};
  }

  & span {
    display: none;
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    font-weight: bold;
    height: 4.8rem;
    width: 19.2rem;
    transition: all 0.1s;

    & span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 3rem;

    }

    &:hover {
      img {
        // values below are equivalent text color on hover
        filter: invert(0.5) sepia(60) saturate(87) hue-rotate(232deg);
      }
      background-color: ${white};
      color: ${royalBlue};
    }

    &:active {
      transform: translateY(0.1rem);
    }
  }
`;

const WizardNav = ({
  currentStep,
  nextStep,
  previousStep,
  totalSteps,
  gtmPrefix,
}) => (
  <div>

  <StyledWizardNav>

  </StyledWizardNav>
  <div className="buttonDiv">
  {currentStep > 1 ? (
      <BackButton
        id={gtmPrefix + currentStep + GTM.wizardNav.back}
        onClick={previousStep}
      >
        <SvgIcon
          src={backArrow}
          title={`Navigate to step ${currentStep - 1}`}
          style={{marginTop: "3rem"}}
        />
        <BackText>Back</BackText>
      </BackButton>
    ) : (
      <Link to={"/"}>
        <BackButton id={gtmPrefix + currentStep + GTM.wizardNav.back}>
          <SvgIcon src={backArrow} title="Navigate to the homepage" />
          <BackText>Back</BackText>
        </BackButton>
      </Link>
    )}

     {currentStep < totalSteps && (
      <NextButton
        id={gtmPrefix + currentStep + GTM.wizardNav.next}
        onClick={nextStep}
      >
        <span>Next</span>
        <SvgIcon src={nextArrow} title={`Go to next step`}
          style={{marginTop: "3rem"}}/>
      </NextButton>
    )}
    </div>
  </div>
);

export default WizardNav;
