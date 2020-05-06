import BaseButton from "./BaseButton";
import { Button } from "antd-mobile";
import React from "react";
import styled, { css } from "styled-components";
import { theme } from "../../constants/theme";
const { button } = theme;

// props: inline, primary, primarylight, secondary, tertiary

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
`;

export default SubmitButton;
