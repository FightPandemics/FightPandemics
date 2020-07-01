import styled, { css } from "styled-components";
import { Button } from "antd";
import { theme } from "constants/theme";
const { button } = theme;

// props: inline, primary, primarylight, secondary, tertiary

const SubmitButton = styled(Button).attrs(({ size, inline }) => {
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
  
  ${(props) =>
    props.disabled &&
    css`
      background-color: #8e87f4 !important;
      color: #fff !important;
    `}
  width: 100%;
  height: 47px;
`;

export default SubmitButton;
