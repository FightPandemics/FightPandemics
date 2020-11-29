import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { offWhite, ghostWhite } = theme.colors;

const Main = styled.main`
  padding: 6rem 0;
  display: flex;
  align-items: inherit;
  justify-content: center;
  ${(props) => `${props.isProfile ? `background: ${ghostWhite};` : ""}`}

  min-height: calc(100vh - 11.9rem); // mobile footer height
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-color: ${offWhite};
    padding: 6rem 0 0;
    min-height: calc(100vh - 6rem); // footer height
  }
`;

export default Main;
