import styled, { css } from "styled-components";
import { Button } from "antd-mobile";

import { theme, mq } from "../../constants/theme";
const { colors } = theme;
const { tablet } = mq;
/*
  Props accepted:
  inline, primary, large, whitebg, roundborder, textOnly, width
*/

export default styled(Button)`
  display: ${(props) => (props.inline ? "inline-block" : "initial")};
  background-color: ${colors.selago};
  color: #fff;
  line-height: normal;
  height: 100%;
  cursor: pointer;
  margin-right: 25px;

  &:hover {
    border: 1px solid ${colors.royalBlue} !important;
  }

  ${(props) =>
    props.primary &&
    css`
      background-color: ${colors.royalBlue};
      color: #fff;
      &.am-button {
        &:before {
          border: 2px solid ${colors.royalBlue} !important;
        }
      }
      &:hover,
      &:active,
      &.am-button-active {
        background-color: #fff;
        color: ${colors.royalBlue};
      }
    `}

  ${(props) =>
    props.large &&
    css`
      padding: 10px 35px;
      font-size: 15px;
      &.am-button {
        &:before {
          border-radius: 45px !important;
        }
      }
    `}

  ${(props) =>
    props.roundborder &&
    css`
      border-radius: 45px;
    `}

  ${(props) =>
    props.whitebg &&
    css`
      background-color: #fff;
      color: ${colors.royalBlue};
      &.am-button {
        &:before {
          border: 2px solid ${colors.royalBlue} !important;
        }
      }
      &:hover,
      &:active,
      &.am-button-active {
        background-color: ${colors.royalBlue};
        color: #fff;
      }
    `}

  ${(props) =>
    props.textOnly &&
    css`
      display: ${(props) => (props.display ? props.display : "initial")};
      background-color: transparent;
      color: ${colors.royalBlue};
      margin-right: 0;
      height: auto;
      text-overflow: unset;
      &.am-button {
        &:before {
          display: none;

          @media screen and (min-width: ${tablet.narrow.minWidth}) {
            display: none !important;
          }
        }

        span {
          white-space: normal;
        }
      }
    `}

    ${(props) =>
      props.width &&
      css`
        width: ${props.width};
      `};
`;
