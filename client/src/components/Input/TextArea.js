import { Input } from "antd";
import styled from "styled-components";
import { LIGHTER_GRAY } from "../../constants/colors";

const TextArea = styled(Input.TextArea)`
  background-color: ${LIGHTER_GRAY};
  font-size: 1.4rem;
  color: black;
  resize: none;
  border: none;
  width: 96%;
  border-radius: 4rem;
  padding: 1.4rem;
  overflow: hidden;

  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: unset;
  }
`;

export default TextArea;
