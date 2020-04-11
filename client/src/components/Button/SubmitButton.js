import React from "react";
import { Button } from "antd-mobile";
import styled from "styled-components";

import { theme } from "../../constants/theme";

export default ({ title, ...props }) => {
  const StyledButton = styled(Button).attrs({
    type: "primary",
  })`
    ${theme.button}
    ${props.type && props.type === "primary" ? theme.button.primary : ""}
  `;
  return <StyledButton {...props}>{title}</StyledButton>;
};
