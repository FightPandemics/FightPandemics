import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { medium, xlarge } = theme.typography.size;

const WizardProgress = styled.h5`
  flex: 0;
  font-size: ${medium};
  font-weight: 300;
  margin-bottom: 1rem;
  text-align: center;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${xlarge};
    margin-bottom: 3rem;
  }
`;

export default WizardProgress;
