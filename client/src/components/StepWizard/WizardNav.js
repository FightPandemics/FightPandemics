import { Button } from "grommet";
import { FormNextLink, FormPreviousLink } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import { PRIMARY } from "../../constants/colors";

const StyledWizardNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const CircleButton = styled(Button)`
  justify-self: flex-end;
  background-color: ${PRIMARY};
  border-radius: 24px;
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    {currentStep > 1 ? (
      <Button
        plain
        onClick={previousStep}
        icon={<FormPreviousLink />}
        a11yTitle={`Navigate to step ${currentStep - 1}`}
      />
    ) : (
      <Button
        plain
        href="/"
        icon={<FormPreviousLink />}
        a11yTitle="Navigate to the homepage"
      />
    )}
    {currentStep < totalSteps && (
      <CircleButton
        primary
        color="primary"
        onClick={nextStep}
        a11yTitle={`Navigate to step ${currentStep + 1}`}
        icon={<FormNextLink color="#fff" />}
      />
    )}
  </StyledWizardNav>
);

export default WizardNav;
