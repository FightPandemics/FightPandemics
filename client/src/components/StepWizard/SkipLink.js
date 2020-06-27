import styled from "styled-components";
import { theme } from "constants/theme";

export default styled.p`
  ${theme.typography.paragraph.skip}
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  span:hover {
    color: #40a9ff;
  }
`;
