import styled from "styled-components";

import { mq, theme } from "../../constants/theme";

const { desktop, tablet } = mq;

const marginTop = "100px";

const WizardContainer = styled.div`
font-family: ${theme.typography.font.family.display}
  display: flex;
  flex-flow: row wrap;
  margin: 5rem 0 0 0;
  width:100%;
  max-height: calc(100vh - 153px);
  justify-content: center;

  .title{
    font-weight: bold;
    font-size: 1.6rem;
    margin: 1rem 0;
  }

  .sub-title{
    font-weight: 200;
    font-size: 1.4rem;
  }

  .content-wrapper{
    width:100%;
    margin: 3rem 0;
    font-weight: regular;
    font-size: 1.4rem;
  }

  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    display: flex;
    justify-content: center;
    margin: ${marginTop} auto;
    max-width: 850px;

    .title{
      text-align:center;
      font-size: 3.6rem;
    }
  
    .sub-title{
      text-align:center;
      font-size: 2.2rem;
    }
  
    .content-wrapper{
      display:flex;
      justify-content: center;
      max-width: 65rem;
      font-size: 2.2rem;
    }
  
    .answer-buttons-wrapper{
      margin: 0 auto 0 auto;
      width: 55.6rem;
      font-weight: regular;
      font-size: 2.2rem;
    }
  }
  
`;

/*
  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    margin: 0 auto;
    max-width: 375px;
  }
*/

export default WizardContainer;
