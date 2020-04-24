import styled from "styled-components";
import { Accordion } from "antd-mobile";
import { theme } from "../../constants/theme";
const { display } = theme.typography.font.family;

export const FilterAccordion = styled(Accordion)`
  font-family: ${display};
  &.am-accordion {
    padding: 2rem 0;
    &:before {
      content: normal !important;
    }
  }
`;

export const FilterAccordionPanel = styled(Accordion.Panel)`
  text-align: center;
  cursor: pointer;
  margin: 1.2rem;
  text-align: left;
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
    padding: 0.8rem 0.5rem;
  }
`;
