import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";

const { royalBlue } = theme.colors;

const StyledLabel = styled.label`
  color: ${royalBlue};
`;

const Label = ({ label, htmlFor, style }) => (
  <StyledLabel htmlFor={htmlFor} style={style}>
    {label}
  </StyledLabel>
);

export default Label;
