import React from "react";
import styled from "styled-components";
import { Accordion } from "antd-mobile";
import { ROYAL_BLUE } from "../../constants/colors";

export default styled(Accordion.Panel)`
  &.am-accordion-item {
    .am-accordion-header,
    .am-accordion-content-box {
      &:after {
        content: normal !important;
      }
    }
  }
`;
