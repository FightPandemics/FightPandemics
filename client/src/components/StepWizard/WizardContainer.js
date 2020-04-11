import styled from "styled-components";

import { mq } from "../../constants/theme";

const { tablet, desktop } = mq;

const WizardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 100px 0 0 0;
  max-width: calc(100vw - 50px);
  height: 100vh;
  max-height: calc(100vh - 153px);

  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    margin: 0 auto;
    max-width: 375px;
  }
`;

export default WizardContainer;
