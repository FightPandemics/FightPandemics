import React from "react";
import styled from "styled-components";
import { Button } from "antd-mobile";
import { SELAGO, ROYAL_BLUE } from "../../constants/colors";
import DownArrow from "../Icon/down-arrow";

const Option = styled(Button)`
  display: inline-block;
  color: ${ROYAL_BLUE};
  background-color: ${SELAGO};
  cursor: pointer;
  font-size: 1.3rem;
  height: 100%;
  margin-top: 0.7rem;
  margin-right: 0.7rem;
  line-height: 3rem;
  border-radius: 0.6rem;
  padding: 0.5rem 1rem;
  &.am-button {
    &:before {
      content: normal !important;
    }
  }
  &:hover,
  &:active,
  &.am-button-active {
    background-color: ${ROYAL_BLUE};
    color: #fff;
  }
`;

const labelWrapperStyles = {
  display: "flex",
  alignItems: "center",
};

const labelStyles = {
  marginRight: "1rem",
  fontWeight: "600",
  letterSpacing: "0.1rem",
};

export default ({ label, handleClick }) => {
  return (
    <Option>
      <div onClick={handleClick} style={labelWrapperStyles}>
        <span style={labelStyles}>{label}</span>
        <DownArrow />
      </div>
    </Option>
  );
};
