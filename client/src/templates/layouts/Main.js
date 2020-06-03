import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { offWhite } = theme.colors;

const Main = styled.main`
  margin-left: 2rem;
  margin-right: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: calc(100% - 119px);
  min-height: -o-calc(100% - 119px); /* opera */
  min-height: -webkit-calc(100% - 119px); /* google, safari */
  min-height: -moz-calc(100% - 119px); /* firefox */

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    background-color: ${offWhite};

    min-height: calc(100%-160px);
    min-height: -o-calc(100% - 160px); /* opera */
    min-height: -webkit-calc(100% - 160px); /* google, safari */
    min-height: -moz-calc(100% - 160px); /* firefox */
  }
`;

export default Main;
