import React from "react";
import styled from "styled-components";

import LabelledInput from "./LabelledInput";
import Input from "./BaseInput";

export default ({
  label,
  type,
  placeholder,
  labelStyle,
  inputStyle,
  ...props
}) => {
  return (
    <LabelledInput label={label} style={labelStyle}>
      <Input
        type={type}
        style={inputStyle}
        placeholder={placeholder}
        {...props}
      />
    </LabelledInput>
  );
};
