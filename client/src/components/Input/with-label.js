import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";

const { royalBlue } = theme.colors;

const StyledLabel = styled.label`
  color: ${royalBlue};
`;

const Label = (Component) => ({ label, style }) => (
  <StyledLabel>
    <p style={style}>{label}</p>
    <Component />
  </StyledLabel>
);

export default Label;
