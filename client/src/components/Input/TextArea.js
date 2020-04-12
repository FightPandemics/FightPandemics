import { Input } from "antd";
import styled from "styled-components";
import { ROYAL_BLUE, LIGHTER_GRAY } from "../../constants/colors";

export default styled(Input.TextArea)`
  background-color: ${LIGHTER_GRAY};
  font-size: 1.4rem;
  color: black;
  resize: none;
  border: none;
  width: 96%;
  border-radius: 4rem;
  padding: 1.4rem;

  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: unset;
  }
`;
