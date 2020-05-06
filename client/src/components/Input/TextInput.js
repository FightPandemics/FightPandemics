import Input from "./BaseInput";
import React from "react";
import withLabel from "./with-label";

const TextInput = ({
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
  return (
    <TextField
      label={label}
      style={labelStyle}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
