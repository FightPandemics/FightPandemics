import styled from "styled-components";
import { theme } from "constants/theme";

const { darkGray, darkerGray, royalBlue, red } = theme.colors;

const BaseInput = styled.input`
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.disabled ? darkGray : royalBlue};
  box-shadow: none;
  color: ${(props) => (props.disabled ? darkGray : darkerGray)};

  &.has-error {
    border-bottom-color: ${red};
    color: ${red};
  }

  ${(props) =>
  props.disabled ? `` :
  `
  &:focus,
  &:hover,
  &:active {
    border-bottom-color: ${royalBlue};
    box-shadow: 0 1px 0 0 ${royalBlue};
  }
  `
  };
`;

export default BaseInput;
