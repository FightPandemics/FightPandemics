import styled from "styled-components";
import { theme } from "constants/theme";

const { darkGray, darkerGray, royalBlue, red } = theme.colors;

const BaseInput = styled.input`
  border: none;
  border-bottom: ${(props) =>
    props.disabled ? "1px solid " + darkGray : "1px solid " + royalBlue};
  box-shadow: none;
  color: ${(props) => (props.disabled ? darkGray : darkerGray)};
  transition: 150ms border;

  &.has-error {
    border-bottom: 1px solid ${red};
    color: ${red};
  }
  &:focus,
  &:hover,
  &:active {
    border-bottom: ${(props) =>
      props.disabled ? "1px solid " + darkGray : "2px solid " + royalBlue};
  }
`;

export default BaseInput;
