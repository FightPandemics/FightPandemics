import styled, { css } from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "~/constants/theme";

const LargeButton = styled(BaseButton)`
  ${theme.button.large}
  ${theme.button.boldedText}

  ${(props) =>
    props.primary &&
    css`
      ${theme.button.primary}

      &:hover, &:active, &:focus {
        ${theme.button.secondary}
      }
    `}

  ${(props) =>
    props.primaryLight &&
    css`
      ${theme.button.primaryLight}

      &:hover, &:active, &:focus {
        ${theme.button.primary}
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      ${theme.button.secondary}

      &:hover, &:active, &:focus {
        ${theme.button.primary}
      }
    `}

  ${(props) =>
    props.tertiary &&
    css`
      ${theme.button.tertiary}

      &:hover, &:active, &:focus {
        ${theme.button.primary}
      }
    `}
`;

export default LargeButton;
