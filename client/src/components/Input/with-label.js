import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  color: #425af2;
`;

const Label = (Component) => ({ label, style }) => (
  <StyledLabel>
    <p style={style}>{label}</p>
    <Component />
  </StyledLabel>
);

export default Label;
