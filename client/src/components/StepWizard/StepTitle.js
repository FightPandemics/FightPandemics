import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { font, two, three } = theme.typography.heading;

const StepTitle = styled.h2`
  font-family: ${font};
  font-weight: bold;
  font-size: ${three};
  line-height: 3rem;
  text-align: center;
  width: 100%;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${two};
  }
`;

export default StepTitle;
