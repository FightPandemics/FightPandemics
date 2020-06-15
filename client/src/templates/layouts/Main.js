import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { offWhite } = theme.colors;

const Main = styled.main`
  padding: 7rem 2rem 0rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: calc(100% - 119px);

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-color: ${offWhite};

    min-height: calc(100% - 160px);
  }
`;

export default Main;
