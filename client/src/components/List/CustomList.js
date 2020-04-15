import styled, { css } from "styled-components";
import { List } from "antd-mobile";

/* 
  Props accepted: 
  center
*/

export default styled(List)`
  &.am-list {
    .am-list-body {
      border-top: unset;
      &::before {
        content: unset !important;
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
