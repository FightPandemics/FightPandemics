import styled from "styled-components";
import { InputItem } from "antd-mobile";
import { theme, mq } from "constants/theme";

const { darkGray, royalBlue } = theme.colors;

const StyledTextInput = styled(InputItem)`
  width: 100%;

  &.am-list-item {
    &.am-input-item {
      padding-left: 0;
      .am-list-line {
        padding-right: 0;
      }
    }
  }
  .am-input-control {
    input {
      ${theme.form.input}
      color: ${darkGray};
      border: none;
      border-bottom: 0.1rem solid ${royalBlue} !important;
      font-size: 1.6rem;
      padding: 0.8rem;
      margin: 0.5rem 0;
    }
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    width: 40.8rem;

    &.am-list-item {
      &.am-input-item {
        height: 5rem;
      }
    }

    .am-input-control {
      input {
        border: 0.2rem solid ${royalBlue};
        border-radius: 4.6rem;
        height: 5rem;
        padding-left: 4rem;
      }
    }
  }
`;

export default StyledTextInput;
