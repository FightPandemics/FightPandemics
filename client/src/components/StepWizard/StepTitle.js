import styled from "styled-components";
import { theme } from "constants/theme";

const StepTitle = styled.h2`
  font-family: ${theme.typography.heading.font};
  font-weight: bold;
  font-size: ${theme.typography.heading.three};
  line-height: 3rem;
  text-align: center;
`;

export default StepTitle;
