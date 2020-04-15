import React from "react";
import { Radio } from "antd";

export default ({ options, onChange }) => {
  return (
    <Radio.Group onChange={onChange}>
      {options.map((option, idx) => (
        <Radio value={option} key={idx}>
          {option.text}
        </Radio>
      ))}
    </Radio.Group>
  );
};
