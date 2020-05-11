import styled from "styled-components";

import { mq } from "constants/theme";

const Main = styled.main`
  margin-left: 25px;
  margin-right: 25px;

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    margin: 0;
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    margin: 0;
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    margin: 0;
  }
`;

export default Main;
