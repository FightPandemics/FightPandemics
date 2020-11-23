import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { offWhite, ghostWhite } = theme.colors;

const Main = styled.main`
  padding-top: 4rem;
  display: flex;
  align-items: inherit;
  justify-content: center;
  ${(props) => `${props.isProfile ? `background: ${ghostWhite};` : ""}`}

  min-height: calc(100vh - 11.9rem); // mobile footer height
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-color: ${offWhite};
    padding-top: 6rem;
    min-height: calc(100vh - 6rem); // footer height
  }
`;

export default Main;
