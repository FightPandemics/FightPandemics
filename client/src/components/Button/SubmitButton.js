import React from "react";
import { Button } from "antd-mobile";
import styled from "styled-components";

const StyledButton = styled(Button).attrs({
  type: "primary",
})`
  background: #7d4cdb;
  border-radius: 18px;
  font-weight: bold;
`;

export default ({ title, ...props }) => {
  return <StyledButton {...props}>{title}</StyledButton>;
};
