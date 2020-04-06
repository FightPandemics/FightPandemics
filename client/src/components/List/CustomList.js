import React from "react";
import styled, { css } from "styled-components";
import { List } from "antd-mobile";

/* 
  Props accepted: 
  center
*/

export default styled(List)`
  &.am-list {
    .am-list-body {
      &::before {
        content: normal !important;
      }
      .am-list-line {
        padding-right: 0;
        padding-left: 0;
      }
    }
  }

  ${(props) =>
    props.center &&
    css`
      display: flex;
      justify-content: center;
    `}
`;
