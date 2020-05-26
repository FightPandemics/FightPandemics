import styled from "styled-components";
import { theme } from "constants/theme";

const { darkGray, darkerGray, primary, royalBlue } = theme.colors;

const BaseInput = styled.input`
  border: unset;
  border-bottom: ${(props) =>
    props.disabled ? "1px solid " + darkGray : "1px solid " + primary};
  color: ${(props) => (props.disabled ? darkGray : darkerGray)};
  padding-bottom: 1px;
  transition: 150ms border;

  &:focus,
  &:hover,
  &:active {
    border-bottom: ${(props) =>
      props.disabled ? "1px solid " + darkGray : "2px solid " + royalBlue};
    padding-bottom: 0;
  }
`;

export default BaseInput;
