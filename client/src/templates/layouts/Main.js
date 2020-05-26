import styled from "styled-components";
import { mq } from "constants/theme";

const Main = styled.main`
  margin-left: 2rem;
  margin-right: 2rem;

  min-height: calc(100vh-124px);

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    min-height: calc(100vh-166px);
  }

  @media screen and (min-width: ${mq.desktop.small.minWidth}) {
    min-height: calc(100vh-166px);
  }

  @media screen and (min-width: ${mq.desktop.medium.minWidth}) {
    min-height: calc(100vh-166px);
  }
`;

export default Main;
