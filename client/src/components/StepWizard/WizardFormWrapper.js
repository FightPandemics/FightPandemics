import styled from "styled-components";
import { mq } from "constants/theme";

const WizardFormWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  margin: 0;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 0 5rem 2rem 0;
  }
`;

export default WizardFormWrapper;
