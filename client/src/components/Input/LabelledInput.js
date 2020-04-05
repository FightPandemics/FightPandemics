import React from "react";
import styled from "styled-components";

const Label = styled.label`
  color: #425af2;
`;

export default ({ label, children, style }) => {
  return (
    <Label>
      <p style={style}>{label}</p>
      {children}
    </Label>
  );
};
