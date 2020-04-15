import styled from "styled-components";
import { theme } from "../../constants/theme";
const { display } = theme.typography.font.family;

export default styled.div`
  font-family: ${display};
  width: 100%;
  padding: 2rem 0;
  position: relative;
  .create-post {
    position: fixed;
    bottom: 5%;
    right: 5%;
    cursor: pointer;
  }
`;
