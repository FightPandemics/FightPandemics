import React from "react";
import styled from "styled-components";
import { Tag } from "antd-mobile";
import { ROYAL_BLUE } from "../../constants/colors";

const FilterTag = styled(Tag)`
  &.am-tag-normal {
    padding: 0 1.5rem;
  }

  &.am-tag-normal,
  &.am-tag-active,
  &.am-tag-disabled {
    border: 0.1rem solid ${ROYAL_BLUE} !important;
    border-radius: 4rem !important;
    color: ${ROYAL_BLUE};
    font-size: 1.1rem;
    margin: 0.5rem 0.3rem;

    &:before {
      border: unset !important;
    }
  }

  &.am-tag-disabled {
    background-color: unset;
    padding: 0 0.8rem;
  }

  &.am-tag-active {
    color: #fff !important;
    background-color: ${ROYAL_BLUE} !important;
    border-radius: 4rem !important;
  }
`;

export default ({ label, selected, disabled, handleClick }) => {
  return (
    <FilterTag disabled={disabled} selected={selected}>
      <div onClick={handleClick}>{label}</div>
    </FilterTag>
  );
};
