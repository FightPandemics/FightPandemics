import styled from "styled-components";
import TextInput from "../Input/TextInput";
import { theme } from "../../constants/theme";

export default styled(TextInput)`
  ${theme.form.input}
  border-color: ${theme.colors.primary};
  border-width: 0 0 0.1rem 0;
  color: ${theme.colors.darkGray};
  padding: 0.5rem 0;
  margin: 0.5rem 0;
`;
