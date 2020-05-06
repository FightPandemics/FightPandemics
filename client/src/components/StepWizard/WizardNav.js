import { Link } from 'react-router-dom';
import React from "react";
import SvgIcon from "../Icon/SvgIcon";
import backArrow from "~/assets/icons/back-arrow.svg";
import nextArrow from "~/assets/icons/next-arrow.svg";
import styled from "styled-components";
import { Link } from 'react-router-dom';

// ICONS




const StyledWizardNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  height: 7rem;
  margin-bottom: 1rem;
  /* flex: 0; */

  & + div {
    display: flex;
    flex-flow: row wrap;
    flex: 1;
    max-height: calc(100% - 8rem); /* align-items: stretch; */
    /* min-height: 100%; */
    & > div {
      min-height: 100%;
    }
  }
`;

const PrevButton = styled(SvgIcon)`
  cursor: pointer;
`;

const NextButton = styled(SvgIcon)`
  cursor: pointer;
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    {currentStep > 1 ? (
      <PrevButton
        src={backArrow}
        onClick={previousStep}
        a11yTitle={`Navigate to step ${currentStep - 1}`}
      />
    ) : (
      <Link to={"/"}>
        <PrevButton
          src={backArrow}
          a11yTitle="Navigate to the homepage"
        />
      </Link>
    )}
    {currentStep < totalSteps && (
      <NextButton src={nextArrow} onClick={nextStep} />
    )}
  </StyledWizardNav>
);

export default WizardNav;
