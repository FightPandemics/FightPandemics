import React from "react";
import StyledSelector from "./StyledSelector";
const { Option } = StyledSelector;

const BaseSelector = ({
  options,
  key = "text",
  optionProps,
  onChange,
  suffixIcon,
  filterOptions,
  defaultValue,
}) => (
  <StyledSelector
    suffixIcon={suffixIcon}
    defaultValue={defaultValue}
    filterOptions={filterOptions}
    onChange={onChange}
    getPopupContainer={() => document.getElementsByClassName('ant-select-selector')[0]}
  >
    {options.map((item) => (
      <Option {...optionProps} key={item.value} value={item.value}>
        {item[key]}
      </Option>
    ))}
  </StyledSelector>
);
export default BaseSelector;
