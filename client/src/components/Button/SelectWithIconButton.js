import styled, { css } from "styled-components";
import SubmitButton from "./SubmitButton";

// props: icon, long, righticon

const SelectWithIconButton = styled(SubmitButton).attrs(({ icon, inline }) => {
  return { icon, inline: "true" };
})`
  border-radius: 0.6rem;
  font-weight: 600;
  font-size: 1.4rem;
  margin: 0.5rem;
  padding: 2rem !important;

  ${(props) =>
    props.long &&
    css`
      padding: 1.5rem 1rem !important;
      font-weight: normal;
      font-size: 1.2rem;
      margin: 0;

      span {
        margin-right: 2rem;
      }

      .am-icon-xxs {
        width: 1.2rem;
        height: 1.2rem;
      }
    `}

  ${(props) =>
    props.righticon &&
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
