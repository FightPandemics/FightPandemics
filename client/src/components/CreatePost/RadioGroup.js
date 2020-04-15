import React from "react";
import { Radio } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default ({ value, radioGroup, handleChange }) => {
  return (
    <Radio.Group defaultValue={value} value={value} onChange={handleChange}>
      <h2>{radioGroup.label}</h2>
      {radioGroup.options.map((option, idx) => {
        return (
          <Radio value={option.value} style={radioStyle} key={idx}>
            {option.label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};
