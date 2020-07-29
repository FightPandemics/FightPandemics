import styled from "styled-components";
import { mq } from "constants/theme";

const WizardContainer = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  width: 100%;
  height: 58rem;
  overflow-x: hidden;
  overflow-y: hidden;

  @media screen and (max-width: ${mq.tablet.narrow.minWidth}) {
	  padding: 1rem 2rem;
  }
`;

export default WizardContainer;
