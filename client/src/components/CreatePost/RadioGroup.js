import React from "react";
import { Radio } from "antd";

export default ({ options }) => {
  return (
    <Radio.Group>
      {options.map((option, idx) => (
        <Radio value={option} key={idx}>
          {option.text}
        </Radio>
      ))}
    </Radio.Group>
  );
};
