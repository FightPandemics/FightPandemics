import styled from "styled-components";
import { Input } from "antd";

import { theme } from "../../constants/theme";
const { display } = theme.typography.font.family;
const { medium, xlarge } = theme.typography.size;
const { royalBlue, darkGray } = theme.colors;

export const StyledForm = styled.form`
  font-family: ${display};
  margin-top: 2rem;
  padding-right: 1.8rem;
`;

export const StyledInput = styled(Input)`
  color: ${royalBlue};
  font-size: ${xlarge};
  border: none;
  outline: none;
  padding: 0;
  margin-bottom: 2rem;
  &.ant-input:hover,
  &.ant-input:focus {
    border-right-width: unset !important;
    border-color: unset;
    box-shadow: unset;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  color: ${darkGray};
  font-size: ${medium};
  resize: none;
  border: none;
  outline: none;
  padding: 0;
  &.ant-input:hover,
  &.ant-input:focus {
    border-right-width: unset !important;
    border-color: unset;
    box-shadow: unset;
  }
`;
