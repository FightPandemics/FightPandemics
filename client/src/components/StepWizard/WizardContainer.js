import styled from "styled-components";

import { mq } from "../../constants/theme";

const { desktop } = mq;

const marginTop = "100px";

const WizardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: ${marginTop} 0 0 0;
  max-width: calc(100vw - 50px);
  height: 100vh;
  max-height: calc(100vh - 153px);
  justify-content: center;

  @media screen and (min-width: ${desktop.small.minWidth}) {
    margin: ${marginTop} auto;
    width: 100%;
    max-width: 650px;
  }
`;

/*
  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    margin: 0 auto;
    max-width: 375px;
  }
*/

export default WizardContainer;
