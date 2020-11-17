import styled from "styled-components";

import { theme } from "constants/theme";

const InputError = styled.small`
  color: ${theme.colors.red};
  display: block;
  max-width: fit-content;
`;

export default InputError;
