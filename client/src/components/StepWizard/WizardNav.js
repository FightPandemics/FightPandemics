import { Button } from "grommet";
import { FormNextLink, FormPreviousLink } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import { theme } from "../../constants/theme";
import NextArrow from "../../components/Icon/next-arrow";
import BackArrow from "../../components/Icon/back-arrow";

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

const PrevButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  box-shadow: unset;
  outline-color: transparent;
  border-color: transparent;
`;

const CircleButton = styled(Button)`
  justify-self: flex-end;
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    {currentStep > 1 ? (
      <PrevButton
        plain
        onClick={previousStep}
        icon={<BackArrow />}
        a11yTitle={`Navigate to step ${currentStep - 1}`}
      />
    ) : (
      <PrevButton
        plain
        href="/"
        icon={<BackArrow />}
        a11yTitle="Navigate to the homepage"
      />
    )}
    {currentStep < totalSteps && <NextArrow onClick={nextStep} />}
  </StyledWizardNav>
);

export default WizardNav;
