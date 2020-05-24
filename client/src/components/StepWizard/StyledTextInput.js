import styled from "styled-components";
import { InputItem } from "antd-mobile";
import { theme } from "constants/theme";

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
      border-width: 0.1rem;
      border-radius: 5px;
      padding: 0.8rem;
      margin: 0.5rem 0;
    }
  }
`;

export default StyledTextInput;
