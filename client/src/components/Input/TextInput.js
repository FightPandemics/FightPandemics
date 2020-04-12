import React from "react";
import styled from "styled-components";

import withLabel from "./with-label";
import Input from "./BaseInput";

export default ({
  label,
  type,
  placeholder,
  labelStyle,
  inputStyle,
  value,
  onChange,
  ...props
}) => {
  const TextField = withLabel(() => (
    <Input
      type={type}
      style={inputStyle}
      placeholder={placeholder}
      {...props}
    />
  ));
  return <TextField label={label} style={labelStyle} value={value} onChange={onChange}/>;
};
