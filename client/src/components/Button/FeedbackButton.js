import React from "react";
import { Button } from "antd-mobile";
import styled from "styled-components";

export default styled(Button)`
  border: 2px solid #425af2 !important;
  cursor: pointer;
  color: #000;
  &:hover, &.am-button-active {
    background-color: #425af2;
    color: #fff;
  }
`;
