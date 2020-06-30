import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { offWhite } = theme.colors;

const Main = styled.main`
  padding-top: 1rem;

  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  min-height: calc(100% - 119px);

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-color: ${offWhite};
    padding-top: 7rem;

    min-height: calc(100% - 160px);
  }
`;

export default Main;
