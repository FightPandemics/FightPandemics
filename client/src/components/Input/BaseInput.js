import styled from "styled-components";

const BaseInput = styled.input`
  border: unset;
  border-bottom: 1px solid #5970ec;
  transition: 150ms border;

  &:focus,
  &:hover,
  &:active {
    border-bottom: 2px solid #425af2;
  }
`;

export default BaseInput;
