import styled from "styled-components";
import { theme } from "../../constants/theme";

export default styled.div`
  display: flex;
  flex: 1;
  color: ${theme.colors.primary};
  flex-flow: column wrap;

  label {
    ${theme.form.label}

    p {
      margin-bottom: 0.5rem;
    }
  }
`;
