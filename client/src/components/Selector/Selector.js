import React from "react";
import StyledSelector from "./StyledSelector";
const { Option } = StyledSelector;

const BaseSelector = (props) => {
  const { options, key = "text", optionProps, onChange } = props;
  return (
    <StyledSelector {...props} onChange={onChange}>
      {options.map((item) => {
        return (
          <Option {...optionProps} key={item.value} value={item.value}>
            {item[key]}
          </Option>
        );
      })}
    </StyledSelector>
  );
};

export default BaseSelector;
