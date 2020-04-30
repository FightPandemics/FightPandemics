import React from "react";
import { Button } from "antd-mobile";
import styled from "styled-components";

import { theme } from "../../constants/theme";

const SubmitButton = ({ title, handleClick, ...props }) => {
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
  return (
    <StyledButton onClick={handleClick} {...props}>
      {title}
    </StyledButton>
  );
};

export default SubmitButton;
