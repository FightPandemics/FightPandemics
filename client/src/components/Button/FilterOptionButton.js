import React from "react";
import styled from "styled-components";
import { Button, Icon } from "antd-mobile";
import { SELAGO, ROYAL_BLUE } from "../../constants/colors";
import DownArrow from "../Icon/down-arrow";

const Option = styled(Button)`
  display: inline-block;
  color: ${ROYAL_BLUE};
  background-color: ${SELAGO};
  cursor: pointer;
  font-size: 13px;
  height: 100%;
  margin-top: 7px;
  margin-right: 7px;
  line-height: 30px;
  border-radius: 6px;
  padding: 5px 10px;
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
  marginRight: "5px",
  fontWeight: "600",
  letterSpacing: "1px",
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
