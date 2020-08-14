import styled from "styled-components";
import { mq } from "constants/theme";

const WizardContainer = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  width: 50%;
  height: 50%;
  overflow-x: hidden;
  overflow-y: hidden;
  border: 4px solid red;

  @media screen and (max-width: ${mq.tablet.narrow.minWidth}) {
	  padding: 1rem 2rem;
  }
`;

export default WizardContainer;
