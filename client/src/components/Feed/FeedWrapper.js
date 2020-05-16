import styled from "styled-components";
import { theme } from "constants/theme";
const { display } = theme.typography.font.family;

const FeedWrapper = styled.div`
  font-family: ${display};
  width: 100%;
  position: relative;

  .create-post {
    position: fixed;
    bottom: 5%;
    right: 5%;
    cursor: pointer;
  }
`;

export default FeedWrapper;
