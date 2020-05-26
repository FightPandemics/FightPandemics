import styled from "styled-components";
import { InputItem } from "antd-mobile";
import { theme, mq } from "constants/theme";

const { darkGray, primary, royalBlue, white } = theme.colors;

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
      border: 0.1rem solid ${primary};
      border-width: 0.1rem;
      border-radius: 5px;
      padding: 0.8rem;
      margin: 0.5rem 0;
    }
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    .am-input-control {
      input {
        background-color: ${white};
        border: 0.2rem solid ${royalBlue};
        border-radius: 4.6rem;
        font-size: 1.6rem;
        padding-left: 4rem;
      }
  }
`;

// const StyledTextInput = styled.input`
//   border: none;
//   border-bottom: 0.1rem solid ${royalBlue};
//   color: ${darkGray};
//   font-family: 'Poppins';
//   font-size: 1.6rem;
//   height: 5rem;
//   line-height: 2.2rem;
//   padding-left: 4rem;
//   width: 100%;

//   @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
//     border: 0.2rem solid ${royalBlue};
//     border-radius: 4.6rem;
//   }
// `;

export default StyledTextInput;
