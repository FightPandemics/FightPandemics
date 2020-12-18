import styled from "styled-components";
import { theme } from "constants/theme";
const { body } = theme.typography.font.family;

const { lightGray, darkGray } = theme.colors;

const RoundedInput = styled.input`
  font-family: ${body};
  border: 1px solid ${lightGray};
  padding: 1.2rem;
  border-radius: 4rem;
  box-shadow: none;
  font-size: 1.3rem;
  color: ${darkGray};
  width: 70%;
`;

export default RoundedInput;
