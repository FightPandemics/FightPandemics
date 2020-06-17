import { Checkbox } from "antd";
import styled from "styled-components";
import { theme } from "constants/theme";

const { darkGray, darkerGray } = theme.colors;

const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  .ant-checkbox-inner {
    border-color: ${darkGray};
    width: 2rem;
    height: 2rem;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.color || "#6076ef"};
    border-color: ${darkGray};
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    transform: rotate(45deg) scale(1.5) translate(-40%, -45%);
    -webkit-transform: rotate(45deg) scale(1.5) translate(-40%, -45%);
    -ms-transform: rotate(45deg) scale(1.5) translate(-40%, -45%);
    border-color: none;
  }

  .ant-checkbox-group-item {
    margin: 0.5rem;
    color: ${darkerGray};
  }
`;

export default StyledCheckboxGroup;
