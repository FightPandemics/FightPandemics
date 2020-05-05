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
    ${theme.button.submit}
  `;
  return (
    <StyledButton inline onClick={handleClick} {...props}>
      {title}
    </StyledButton>
  );
};

export default SubmitButton;
