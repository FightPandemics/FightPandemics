import styled from "styled-components";
import { theme } from "../../constants/theme";

const { darkGray, royalBlue } = theme.colors;
const { display } = theme.typography.font.family;
const { medium } = theme.typography.size;

export default styled.div`
  font-family: ${display};
  margin-top: 2rem;

  .title {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .settings {
    margin-bottom: 1rem;
    .buttons {
      margin-bottom: 0.5rem;
      a {
        margin-top: 0;
        margin-right: 1.8rem;
      }
    }
    .inline {
      margin-left: 0.2rem;
      span.ant-radio + * {
        font-size: ${medium};
        color: ${darkGray};
        letter-spacing: 0;
      }
      .ant-radio-inner {
        border-color: #6076ef;
        border-width: 0.2rem;
        &::after {
          background-color: #6076ef;
          top: 0.2rem;
          left: 0.2rem;
        }
      }
    }
  }
  .submit-btn {
    font-family: ${display};
    background-color: ${royalBlue};
    margin-bottom: 3rem;
  }
`;
