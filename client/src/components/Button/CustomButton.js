import React from "react";
import styled, { css } from "styled-components";
import { Button } from "antd-mobile";
import { ROYAL_BLUE, SELAGO } from "../../constants/colors";

/* 
  Props accepted: 
  inline, primary, large, whitebg, roundborder
*/

export default styled(Button)`
  display: ${(props) => (props.inline ? "inline-block" : "initial")};
  background-color: ${SELAGO};
  color: #fff;
  line-height: normal;
  height: 100%;
  cursor: pointer;

  

  ${(props) =>
    props.primary &&
    css`
      background-color: ${ROYAL_BLUE};
      color: #fff;

      &.am-button {
        &:before {
          border: 2px solid ${ROYAL_BLUE} !important;
        }
      }

      &:hover,
      &:active,
      &.am-button-active {
        background-color: #fff;
        color: ${ROYAL_BLUE};
      }
    `}

  ${(props) =>
    props.large &&
    css`
      padding: 10px 40px;
      font-size: 15px;

      &.am-button {
        &:before {
          border-radius: 40px !important;
        }
      }
    `}

  ${(props) =>
    props.roundborder &&
    css`
      border-radius: 40px;
    `}

  ${(props) =>
    props.whitebg &&
    css`
      background-color: #fff;
      color: ${ROYAL_BLUE};

      &.am-button {
        &:before {
          border: 2px solid ${ROYAL_BLUE} !important;
        }
      }

      &:hover,
      &:active,
      &.am-button-active {
        background-color: ${ROYAL_BLUE};
        color: #fff;
      }
    `}
`;
