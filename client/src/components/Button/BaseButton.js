import styled, { css } from "styled-components";
import { Button } from "antd";
import { theme } from "constants/theme";
const { button } = theme;

const BaseButton = styled(Button)`
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
    props.primarylight &&
    css`
      ${button.primarylight}

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

  ${(props) =>
    props.disabled &&
    css`
      &.am-button.am-button-disabled {
        color: ${() => {
          if (props.primary) {
            return button.primary.color;
          } else if (props.primarylight) {
            return button.primarylight.color;
          } else if (props.secondary) {
            return button.secondary.color;
          } else if (props.tertiary) {
            return button.tertiary.color;
          } else {
            return "unset";
          }
        }};
      }
      pointer-events: none;
    `}


  &.am-button {
    border: none;
  }

  &.am-button-inline {
    ${button.inlineBlock}
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    &.am-button::before {
      content: unset !important;
    }
  }

  &.am-button.am-button-disabled > .am-button-icon {
    opacity: 0.6;
  }
`;

export default BaseButton;
