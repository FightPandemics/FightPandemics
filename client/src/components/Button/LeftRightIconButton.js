import styled, { css } from "styled-components";
import SubmitButton from "./SubmitButton";
import { theme } from "constants/theme";
const { button } = theme;

// props: inline, primary, primarylight, secondary, tertiary, icon, righticon

const LeftRightIconButton = styled(SubmitButton).attrs(({ icon, inline }) => {
  return { icon, inline };
})`
  font-weight: 400;
  width: 192px;
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

  ${(props) =>
    props.disabled &&
    css`
      &.am-button.am-button-disabled {
        color: ${() => {
          if (props.primary) {
            return button.primary.color;
          } else if (props.primarylight) {
            return button.primarylight.color;
          } else if (props.secondary) {
            return button.secondary.color;
          } else if (props.tertiary) {
            return button.tertiary.color;
          } else {
            return "unset";
          }
        }};
      }
      pointer-events: none;
    `}
`;

export default LeftRightIconButton;
