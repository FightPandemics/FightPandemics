import React from "react";
import { Button } from "antd-mobile";
import styled from "styled-components";

export default styled(Button).attrs(props => {

})`
  &.am-button-ghost {
    color: #000;

    &::before {
      border: 2px solid #425af2 !important;
    }

    &.am-button-active {
      background-color: #425af2;
      color: #fff;
    }
  }
`