import styled from "styled-components";
import { Tag } from "antd-mobile";
import { theme } from "../../constants/theme";

const { button } = theme;
const { xsmall } = theme.typography.size;

const FilterTag = styled(Tag).attrs(({ selected, disabled }) => {
    return { selected, disabled };
})`
  &.am-tag-normal,
  &.am-tag-active,
  &.am-tag-disabled {
    ${button.secondary}
    font-size: ${xsmall};
    padding: 0 1rem;
    border-radius: 4rem !important;
    margin: 0.5rem 0.3rem;

    &:before {
      border: unset !important;
    }
  }

  &.am-tag-active {
    ${button.primary}
  }

  &.am-tag-disabled {
    background-color: unset;
    padding: 0 0.8rem;
  }
`;

export default FilterTag;
