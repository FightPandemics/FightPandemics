import React from "react";
import styled, { css } from "styled-components";
import { Button } from "antd-mobile";
import DownArrow from "../Icon/down-arrow";
import { ROYAL_BLUE } from "../../constants/colors";

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

  ${(props) =>
    props.long &&
    css`
      padding: 0 1rem;
    `}

  ${(props) =>
    props.border &&
    css`
      border: 0.1rem solid ${ROYAL_BLUE} !important;
    `}

  > * {
    font-family: "Poppins";
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.1rem;

    ${(props) =>
      props.long &&
      css`
        font-weight: 400;
        font-size: 1.1rem;
        letter-spacing: 0;
      `}

    &:first-child {
      margin-right: 2rem;

      ${(props) =>
        props.long &&
        css`
          margin-right: 3rem;
        `}
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

export default ({ label, handleClick, color, bgcolor, long, border }) => {
  return (
    <Option
      size="small"
      long={long}
      border={border}
      color={color}
      bgcolor={bgcolor}
      onClick={handleClick}
    >
      {label}
      <DownArrow />
    </Option>
  );
};
