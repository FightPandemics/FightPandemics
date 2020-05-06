import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  color: #425af2;
`;

const Label = ({ label, style }) => (
    <StyledLabel>
        <p style={style}>{label}</p>
    </StyledLabel>
);

export default Label;
