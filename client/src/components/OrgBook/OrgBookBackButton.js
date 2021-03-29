import React from "react";
import styled from "styled-components";
import { Button } from "antd-mobile";
import backArrow from "assets/icons/back-arrow.svg";
import SvgIcon from "../Icon/SvgIcon";
import { theme } from "../../constants/theme";
const { colors, typography } = theme;
const { display } = typography.font.family;

const BackButton = styled(Button).attrs((props) => {
  return {
    size: "small",
  };
})`
  display: inline-block;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 0.6rem;
  margin-right: 0.7rem;
  cursor: pointer;
  border: ${colors.white} > * {
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
    color: ${(props) => props.color};
    background-color: ${(props) => props.bgcolor};
  }
  &.am-button {
    &:before {
      content: normal !important;
    }
  }
  &.am-button > span {
    margin-left: 1rem;
  }
`;

const BackArrowButton = ({ label, handleClick, ...props }) => {
  return (
    <BackButton {...props} onClick={handleClick}>
      <SvgIcon src={backArrow} title="Back to View Org Profile" />
      <span>{label}</span>
    </BackButton>
  );
};

export default BackArrowButton;
