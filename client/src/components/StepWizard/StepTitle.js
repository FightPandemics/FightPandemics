import styled from "styled-components";
import { theme } from "../../constants/theme";

export default styled.h2`
  flex: 0;
  font-family: ${theme.typography.heading.font};
  font-weight: bold;
  font-size: ${theme.typography.heading.three};
  line-height: 3rem;
`;
