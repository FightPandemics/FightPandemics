import styled from "styled-components";
import { InputItem } from "antd-mobile";
import { theme } from "../../constants/theme";

const StyledTextInput = styled(InputItem)`
  width: 100%;

  &.am-list-item {
    &.am-input-item {
      padding-left: 0;

      .am-list-line {
        padding-right: 0;
      }
    }
  }
  .am-input-control {
    input {
      ${theme.form.input}
      color: ${theme.colors.darkGray};
      border: 0.1rem solid ${theme.colors.primary};
      border-width: 0 0 0.1rem 0;
      padding: 0.5rem 0;
      margin: 0.5rem 0 1rem;
    }
  }
`;

export default StyledTextInput;
