import styled, { css } from "styled-components";
import BaseButton from "./BaseButton";

// props: inline, primary, primarylight, secondary, tertiary, icon, righticon

const LeftRightIconButton = styled(BaseButton).attrs(({ icon, inline }) => {
  return { icon, inline };
})`
  font-weight: 400;
  width: 19.2rem;
  &.am-button > span {
    margin-right: 3rem;
  }
  &.am-button > .am-button-icon {
    margin-right: 1.5rem;
  }

  ${(props) =>
    props.righticon &&
    css`
      &.am-button {
        flex-direction: row-reverse;
      }
      &.am-button > span {
        margin-right: unset;
        margin-left: 3rem;
      }
      &.am-button > .am-button-icon {
        margin-right: unset;
        margin-left: 1.5rem;
      }
    `}
`;

export default LeftRightIconButton;
