import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { offWhite } = theme.colors;

const Main = styled.main`
  padding-top: 4rem;
  display: flex;
  align-items: inherit;
  justify-content: center;

  min-height: calc(100vh - 119px); // mobile footer height
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-color: ${offWhite};
    padding-top: 6rem;

    min-height: calc(100vh - 6rem); // footer height
  }
`;

export default Main;
