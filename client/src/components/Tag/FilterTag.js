import styled from "styled-components";
import { Tag } from "antd-mobile";
import { theme } from "../../constants/theme";

const { royalBlue } = theme.colors;
const { xsmall } = theme.typography.size;

const StyledFilterTag = styled(Tag).attrs(({ selected, disabled }) => {
  return { selected, disabled };
})`
  &.am-tag-disabled {
    background-color: unset;
    padding: 0 0.8rem;
  }

  &.am-tag-active {
    color: #fff !important;
    background-color: ${royalBlue} !important;
    border-radius: 4rem !important;
  }

  &.am-tag-normal,
  &.am-tag-active,
  &.am-tag-disabled {
    padding: 0 1rem;
    font-size: ${xsmall};
    color: ${royalBlue};
    border: 0.1rem solid ${royalBlue} !important;
    border-radius: 4rem !important;
    margin: 0.5rem 0.3rem;

    &:before {
      border: unset !important;
    }
  }
`;

export default StyledFilterTag;
