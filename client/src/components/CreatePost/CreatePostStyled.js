import styled from "styled-components";
import { theme } from "../../constants/theme";

const { royalBlue } = theme.colors;
const { display } = theme.typography.font.family;

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
    }
  }
  .post-modal {
    border-radius: 0;
  }
  .submit-btn {
    font-family: ${display};
    background-color: ${royalBlue};
    margin-bottom: 3rem;
  }
`;
