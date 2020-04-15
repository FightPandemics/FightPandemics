import styled from "styled-components";
import { ROYAL_BLUE } from "../../constants/colors";

export default styled.div`
  font-family: "Poppins";
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
        color: #282828;
        font-size: 1.4rem;
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
    font-family: "Poppins";
    background-color: ${ROYAL_BLUE};
  }
`;
