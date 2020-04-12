import styled from "styled-components";
import { InputItem } from "antd-mobile";
import { theme } from "../../constants/theme";

export default styled(InputItem)`
  width: 100%;

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
