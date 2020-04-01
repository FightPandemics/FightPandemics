import { Button } from "grommet";
import { FormNextLink, FormPreviousLink } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import { PRIMARY } from "../../constants/colors";

const StyledWizardNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CircleButton = styled(Button)`
  justify-self: flex-end;
  background-color: ${PRIMARY};
  border-radius: 24px;
`;

const WizardNav = ({ currentStep, nextStep, previousStep, totalSteps }) => (
  <StyledWizardNav>
    <Button plain onClick={previousStep} icon={<FormPreviousLink />} />
    {currentStep < totalSteps && (
      <CircleButton
        primary
        color="primary"
        onClick={nextStep}
        icon={<FormNextLink color="#fff" />}
      />
    )}
  </StyledWizardNav>
);

export default WizardNav;
