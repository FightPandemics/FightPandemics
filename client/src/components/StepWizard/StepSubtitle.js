import styled from "styled-components";
import { theme } from "constants/theme";

const { black } = theme.colors;
const { medium } = theme.typography.size;

const StepSubtitle = styled.p`
  color: ${black};
  font-size: ${medium};
  line-height: 2.5rem;
  margin-bottom: 5rem;
  text-align: center;
  width: 100%;
`;

export default StepSubtitle;
