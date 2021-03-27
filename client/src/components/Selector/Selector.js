import React, { useEffect, useState } from "react";
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
  minHeight,
  popUpContainer,
  value,
}) => {
  const [defaultValueState, setDefaultValueState] = useState(defaultValue);
  return (
    <StyledSelector
      suffixIcon={suffixIcon}
      filterOptions={filterOptions}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      getPopupContainer={
        popUpContainer ? () => popUpContainer : () => document.body
      }
      minWidth={minWidth}
      minHeight={minHeight}
    >
      {options.map((item) => (
        <Option
          {...optionProps}
          key={item.key}
          value={item.value}
          id={item.gtm}
        >
          {item[key]}
        </Option>
      ))}
    </StyledSelector>
  );
};
export default BaseSelector;
