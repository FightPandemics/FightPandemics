import React from "react";
import styled from "styled-components";
import NextArrow from "../Icon/next-arrow";
import BackArrow from "../Icon/back-arrow";

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

const PrevButton = styled(BackArrow)`
  cursor: pointer;
`;

const NextButton = styled(NextArrow)`
  cursor: pointer;
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    {currentStep > 1 ? (
      <PrevButton
        onClick={previousStep}
        a11yTitle={`Navigate to step ${currentStep - 1}`}
      />
    ) : (
      <PrevButton
        href="/"
        a11yTitle="Navigate to the homepage"
      />
    )}
    {currentStep < totalSteps && <NextButton onClick={nextStep} />}
  </StyledWizardNav>
);

export default WizardNav;
