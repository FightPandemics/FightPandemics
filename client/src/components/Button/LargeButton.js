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
    `}

  ${(props) =>
    props.primaryLight &&
    css`
      ${theme.button.primaryLight}
    `}

  ${(props) =>
    props.outline &&
    css`
      ${theme.button.outline}
    `}
`;

export default LargeButton;
