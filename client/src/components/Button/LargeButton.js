import styled, { css } from "styled-components";
import { Button } from "antd-mobile";
import { theme } from "../../constants/theme";

const LargeButton = styled(Button)`
  ${theme.button.large}
  ${theme.button.boldedText}

  ${(props) =>
    props.primary &&
    css`
      ${theme.button.primary}

      &:hover, &:active, &:focus {
        ${theme.button.outline}
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
    props.outline &&
    css`
      ${theme.button.outline}

      &:hover, &:active, &:focus {
        ${theme.button.primary}
      }
    `}
`;

export default LargeButton;
