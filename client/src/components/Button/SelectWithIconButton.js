import styled, { css } from "styled-components";
import SubmitButton from "./SubmitButton";
import { theme } from "../../constants/theme";

const { button } = theme;

const SelectWithIconButton = styled(SubmitButton).attrs(({ icon }) => {
  return { icon };
})`
  ${button.selectButton}
  margin: 0.5rem;
  padding: 2rem !important;

  ${(props) =>
    props.rightIcon &&
    css`
      &.am-button > .am-button-icon {
        margin-right: unset;
        margin-left: 1rem;
      }

      &.am-button-inline.am-button-icon {
        flex-direction: row-reverse;
      }
    `}
`;

export default SelectWithIconButton;
