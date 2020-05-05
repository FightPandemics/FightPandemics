import styled, { css } from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "../../constants/theme";
const { button } = theme;

// props: inline, primary, primaryLight, secondary, tertiary

const SubmitButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  ${button.regular}

  ${(props) =>
    props.primary &&
    css`
      ${button.primary}

      &:hover, &:active, &:focus {
        ${button.secondary}
      }
    `}

  ${(props) =>
    props.primaryLight &&
    css`
      ${button.primaryLight}

      &:hover, &:active, &:focus {
        ${button.primary}
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      ${button.secondary}

      &:hover, &:active, &:focus {
        ${button.primary}
      }
    `}

  ${(props) =>
    props.tertiary &&
    css`
      ${button.tertiary}

      &:hover, &:active, &:focus {
        ${button.primary}
      }
    `}
`;

export default SubmitButton;
