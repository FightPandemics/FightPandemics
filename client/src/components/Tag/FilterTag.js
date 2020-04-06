import React from "react";
import styled from "styled-components";
import { Tag } from "antd-mobile";
import { ROYAL_BLUE } from "../../constants/colors";

const FilterTag = styled(Tag)`
  &.am-tag-normal,
  &.am-tag-active {
    color: ${ROYAL_BLUE};
    font-size: 12px;
    margin: 5px 3px;
    &:before {
      border: 1px solid ${ROYAL_BLUE} !important;
      border-radius: 40px !important;
    }
  }

  &.am-tag-active {
    color: #fff !important;
    background-color: ${ROYAL_BLUE} !important;
    border-radius: 40px !important;
  }
`;

export default ({ label, selected, handleClick }) => {
  return (
    <FilterTag selected={selected}>
      <div onClick={handleClick}>{label}</div>
    </FilterTag>
  );
};
