import styled from "styled-components";
import { Accordion } from "antd-mobile";
import { theme } from "constants/theme";
const { display } = theme.typography.font.family;

export const FilterAccordion = styled(Accordion)`
  font-family: ${display};
  &.am-accordion {
    padding-top: 2rem;
    &:before {
      content: normal !important;
    }
  }
`;

export const FilterAccordionPanel = styled(Accordion.Panel)`
  cursor: pointer;
  margin: 1.2rem;

  &.am-accordion-item {
    .am-accordion-header,
    .am-accordion-content-box {
      border-bottom: unset !important;
      &:after {
        content: unset !important;
      }
    }

    .am-accordion-header {
      display: flex !important;
      font-weight: bold !important;

      i {
        transform: unset;
        transition: unset;
        background-size: unset;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='29' viewBox='0 0 24 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5.97754V22.715' stroke='%23425AF2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5 14.3464H19' stroke='%23425AF2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }
    }

    .am-accordion-header[aria-expanded~="true"] {
      i {
        transform: unset;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='3' viewBox='0 0 16 3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.34619H15' stroke='%23425AF2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }
    }
  }

  .am-accordion-content-box {
    padding: 0.8rem 1rem;
  }

  &.filter-2,
  &.filter-3 {
    .am-accordion-content-box {
      text-align: left;
    }
  }

  &.filter-3 {
    .am-accordion-content-box {
      padding-right: 2.1rem;
    }
  }

  &.filter-4 {
    .am-accordion-content-box {
      display: flex;
      justify-content: space-around;
      .am-tag {
        padding: 0 4.2rem;
      }
    }
  }
`;
