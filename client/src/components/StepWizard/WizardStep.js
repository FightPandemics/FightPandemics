import styled from "styled-components";

import { theme } from "constants/theme";
const { font } = theme.typography;

const WizardStep = styled.div`
  min-height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  p {
    font-family: ${font.family.display};
  }
`;

export default WizardStep;
