import React from "react";
import StyledSelector from "./StyledSelector";
const { Option } = StyledSelector;

const BaseSelector = (props) => {
  const {
    options,
    key = "text",
    optionProps,
    onChange,
    suffixIcon,
    filterOptions,
    defaultValue,
  } = props;

  return (
    <StyledSelector
      suffixIcon={suffixIcon}
      defaultValue={defaultValue}
      filterOptions={filterOptions}
      onChange={onChange}
    >
      {options.map((item) => (
        <Option {...optionProps} key={item.value} value={item.value}>
          {item[key]}
        </Option>
      ))}
    </StyledSelector>
  );
};

export default BaseSelector;
