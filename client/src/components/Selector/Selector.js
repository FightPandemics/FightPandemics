import React from "react";
import StyledSelector from "./StyledSelector";
const { Option } = StyledSelector;

const BaseSelector = ({
  id /* added to assign id to fullfillment dropdown to track gtm tag in create post */,
  options,
  key = "text",
  optionProps,
  onChange,
  suffixIcon,
  filterOptions,
  defaultValue,
  minWidth,
}) => (
  <StyledSelector
    id={
      id
    } /* added to assign id to fullfillment dropdown to track gtm tag in create post */
    suffixIcon={suffixIcon}
    defaultValue={defaultValue}
    filterOptions={filterOptions}
    onChange={onChange}
    getPopupContainer={() =>
      document.getElementsByClassName("ant-tabs-content-holder")[0]
    }
    minWidth={minWidth}
  >
    {options.map((item) => (
      <Option {...optionProps} key={item.value} value={item.value}>
        {item[key]}
      </Option>
    ))}
  </StyledSelector>
);
export default BaseSelector;
