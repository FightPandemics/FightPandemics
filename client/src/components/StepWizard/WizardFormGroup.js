import styled from "styled-components";
import { theme } from "constants/theme";

const WizardFormGroup = styled.div`
  display: flex;
  color: ${theme.colors.primary};
  flex-flow: column wrap;
  box-sizing: border-box;
  align-items: center;
  width: 100%;

  label {
    ${theme.form.label}

    p {
      margin-bottom: 0.5rem;
    }
  }
`;

export default WizardFormGroup;
