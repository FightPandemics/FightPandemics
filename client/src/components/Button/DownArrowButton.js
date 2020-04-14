import React from "react";
import styled from "styled-components";
import { Button } from "antd-mobile";
import DownArrow from "../Icon/down-arrow";

const Option = styled(Button)`
  display: inline-block;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 0.6rem;
  padding: 0.5rem 1rem;
  margin-top: 0.7rem;
  margin-right: 0.7rem;
  height: 100%;
  cursor: pointer;
  border: none;

  > * {
    font-family: "Poppins";
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.1rem;

    &:first-child {
      margin-right: 1.2rem;
    }
  }

  &:hover,
  &:active,
  &.am-button-active {
    color: ${(props) => props.bgcolor};
    background-color: ${(props) => props.color};
  }

  &.am-button {
    &:before {
      content: normal !important;
    }
  }
`;

export default ({ label, handleClick, color, bgcolor }) => {
  return (
    <Option size="small" color={color} bgcolor={bgcolor} onClick={handleClick}>
      {label}
      <DownArrow />
    </Option>
  );
};
