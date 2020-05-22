import styled from "styled-components";
import { theme } from "constants/theme";

const { primary, royalBlue } = theme.colors;

const BaseInput = styled.input`
  border: unset;
  border-bottom: 1px solid ${primary};
  transition: 150ms border;

  &:focus,
  &:hover,
  &:active {
    border-bottom: 2px solid ${royalBlue};
  }
`;

export default BaseInput;
