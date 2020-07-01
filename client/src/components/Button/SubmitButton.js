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
      background-color: #8e87f4 !important;
      color: ${button.color} !important;
    `}
  width: 100%;
  height: 47px;
`;

export default SubmitButton;
