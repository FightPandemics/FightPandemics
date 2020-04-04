import React from "react";
import styled from "styled-components";
import { Button, Icon } from "antd-mobile";
import { SELAGO, ROYAL_BLUE } from "../../constants/colors";

const Option = styled(Button)`
  display: inline-block;
  color: ${ROYAL_BLUE};
  background-color: ${SELAGO};
  cursor: pointer;
  font-size: 13px;
  height: 100%;
  padding: 0 10px;
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
  marginRight: "4px",
  fontWeight: "600",
  letterSpacing: "1px",
};

export default ({ filter, handleClick }) => {
  const { label } = filter;
  return (
    <Option onClick={handleClick}>
      <div style={labelWrapperStyles}>
        <span style={labelStyles}>{label}</span>
        <Icon type="down" size="xxs" />
      </div>
    </Option>
  );
};
