import styled from "styled-components";

import BaseInput from "components/Input/BaseInput";
import { theme, mq } from "constants/theme";

const { darkGray, royalBlue } = theme.colors;

const StyledTextInput = styled(BaseInput)`
  width: 100%;
  color: ${darkGray};
  border: none;
  border-bottom: 0.1rem solid ${royalBlue};
  font-size: 1.6rem;
  padding: 0.8rem;
  margin: 0.5rem 0;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    background-color: transparent;
    width: 40.8rem;
    border: 0.2rem solid ${royalBlue};
    border-radius: 4.6rem;
    height: 5rem;
    padding-left: 4rem;
  }
`;

export default StyledTextInput;
