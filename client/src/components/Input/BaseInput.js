import styled from "styled-components";
import { theme } from "constants/theme";

const { darkGray, darkerGray, primary, royalBlue } = theme.colors;

const BaseInput = styled.input`
  border: unset;
  border-bottom: ${(props) =>
    props.disabled ? "1px solid " + darkGray : "1px solid " + primary};
  color: ${(props) => (props.disabled ? darkGray : darkerGray)};
  transition: 150ms border;

  &:focus,
  &:hover,
  &:active {
    border-bottom: ${(props) =>
      props.disabled ? "1px solid " + darkGray : "2px solid " + royalBlue};
  }
`;

export default BaseInput;
