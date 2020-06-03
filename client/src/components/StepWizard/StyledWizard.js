import styled from "styled-components";
import StepWizard from "react-step-wizard";
import { mq } from "constants/theme";

const { tablet, desktop } = mq;

const StyledWizard = styled(StepWizard)`
  display: flex;
  flex-direction: column-reverse;
  align-self: flex-start;
  width: 100%;
  margin: 0 auto;
  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    width: 40%;
  }

  @media screen and (min-width: ${desktop.small.minWidth}) {
    // width: 100%;
  }
`;

export default StyledWizard;
