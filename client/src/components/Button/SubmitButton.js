import React from "react";
import { Button } from "antd-mobile";
import styled from "styled-components";

import { theme } from "../../constants/theme";

export default ({ title, ...props }) => {
  const StyledButton = styled(Button).attrs((props) => {
    return {
      type: "primary",
    };
  })`
    ${theme.button}
    ${props.type && props.type === "primary"
      ? theme.button.primary
      : ""}
    border-radius: 4.6rem;
  `;
  return <StyledButton {...props}>{title}</StyledButton>;
};
