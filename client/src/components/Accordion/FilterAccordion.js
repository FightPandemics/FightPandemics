import React from "react";
import styled from "styled-components";
import { Accordion } from "antd-mobile";

export const FilterAccordion = styled(Accordion)`
  &.am-accordion {
    &:before {
      content: normal !important;
    }
  }
`;

export const FilterAccordionPanel = styled(Accordion.Panel)`
  margin: 10px;
  text-align: center;
  &.am-accordion-item {
    .am-accordion-header,
    .am-accordion-content-box {
      &:after {
        content: normal !important;
      }
    }
    .am-accordion-header {
      display: flex !important;
      font-weight: bold !important;
    }
  }
`;
