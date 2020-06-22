import styled from "styled-components";
import StepWizard from "react-step-wizard";
import { mq } from "constants/theme";

const { tablet, desktop } = mq;

const StyledWizard = styled(StepWizard)`
  display: flex;
  flex-direction: column-reverse;
  align-self: flex-start;
  transition: 0.5s; 
  opacity: ${({ status }) => {
    switch (status) {
      case "entering":
        return '0'
      case "entered":
        return '1'
      case "exiting":
        return '1'
      case "exited":
        return '0'
    }
  }};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    width: 40%;
  }

  @media screen and (min-width: ${desktop.small.minWidth}) {
    // width: 100%;
  }
`;

export default StyledWizard;
