import React from "react";
import styled from "styled-components";
import { Tag } from "antd-mobile";
import { ROYAL_BLUE } from "../../constants/colors";

const FilterTag = styled(Tag)`
  &.am-tag-normal {
    padding: 0 15px;
  }

  &.am-tag-normal,
  &.am-tag-active,
  &.am-tag-disabled {
    border: 1px solid ${ROYAL_BLUE} !important;
    border-radius: 40px !important;
    color: ${ROYAL_BLUE};
    font-size: 12px;
    margin: 5px 3px;

    &:before {
      border: unset !important;
    }
  }

  &.am-tag-disabled {
    background-color: unset;
    padding: 0 8px;
  }

  &.am-tag-active {
    color: #fff !important;
    background-color: ${ROYAL_BLUE} !important;
    border-radius: 40px !important;
  }
`;

export default ({ label, selected, disabled, handleClick }) => {
  return (
    <FilterTag disabled={disabled} selected={selected}>
      <div onClick={handleClick}>{label}</div>
    </FilterTag>
  );
};
