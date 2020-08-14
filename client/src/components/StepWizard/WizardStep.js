import styled from "styled-components";

import { theme } from "constants/theme";
const { font } = theme.typography;

const WizardStep = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: ${(props) => props.alignItems || "center"};
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  margin: auto;

  p {
    font-family: ${font.family.display};
  }
  h5 {
    height: 5.5rem;
    line-height: 6.4rem;
  }
`;

export default WizardStep;
