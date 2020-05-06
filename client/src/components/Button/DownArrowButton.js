import { Button } from "antd-mobile";
import React from "react";
import SvgIcon from "../Icon/SvgIcon";
import downArrow from "~/assets/icons/down-arrow.svg";
import styled from "styled-components";
import { theme } from "../../constants/theme";

// ICONS



const { colors, typography } = theme;
const { display } = typography.font.family;

const Option = styled(Button).attrs((props) => {
  return {
    size: "small",
  };
})`
  display: inline-block;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  padding: ${(props) => (props.long ? "0 1rem" : "0.5rem 1rem")};
  border-radius: 0.6rem;
  margin-top: 0.7rem;
  margin-right: 0.7rem;
  height: 100%;
  cursor: pointer;
  border: ${(props) =>
    props.long ? `0.1rem solid ${colors.royalBlue} !important` : "none"};

  > * {
    font-family: ${display};
    font-weight: ${(props) => (props.long ? "normal" : "600")};
    font-size: ${(props) => (props.long ? "1.1rem" : "1.3rem")};
    letter-spacing: 0.1rem;

    &:first-child {
      margin-right: ${(props) => (props.long ? "3rem" : "1.4rem")};
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

const DownArrowButton = ({ label, handleClick, ...props }) => {
  return (
    <Option {...props} onClick={handleClick}>
      {label}
      <SvgIcon src={downArrow} />
    </Option>
  );
};

export default DownArrowButton;
