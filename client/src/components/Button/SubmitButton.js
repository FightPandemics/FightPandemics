import styled from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "constants/theme";

// props: inline, primary, primarylight, secondary, tertiary

const SubmitButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})``;

export default SubmitButton;
