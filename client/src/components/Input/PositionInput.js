import React, { useState } from "react";
import styled from "styled-components";

function PositionInput() {
  const [text, setText] = useState("XXXXX");

  const StyledTextarea = styled.textarea`
    width: 100%;
    height: 100%;
  `;

  return <StyledTextarea defaultValue={text} />;
}

export default PositionInput;
