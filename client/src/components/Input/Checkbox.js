import { Checkbox } from "antd";
import styled from "styled-components";

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-color: #646464;
    width: 2rem;
    height: 2rem;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.color || "#6076ef"};
    border-color: #939393;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    transform: rotate(45deg) scale(1.5) translate(-40%, -45%);
    -webkit-transform: rotate(45deg) scale(1.5) translate(-40%, -45%);
    -ms-transform: rotate(45deg) scale(1.5) translate(-40%, -45%);
  }
`;

export default StyledCheckbox;
