import { theme, mq } from "constants/theme";
import styled from "styled-components";
const { lighterBlack } = theme.colors;
const { lightGrey } = theme.colors;
const { display, body } = theme.typography.font.family;

export const PositionSubmitModal = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: ${display};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.17;
    text-align: center;
    margin-bottom: 1.4rem;
    color: ${lighterBlack};
  }

  p {
    width: 100%;
    text-align: center;
    font-family: ${body};
    font-size: 1.3rem;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.8rem;
    letter-spacing: normal;
    margin: 0 auto;
    margin-bottom: 3.5rem;
    display: flex;
    justify-content: center;
    color: ${lightGrey};
    width: 49.1rem;
  }

  img {
    padding-bottom: 2rem;
}

button {
    
}

.am-button {
    width: 19.5rem;
    margin: auto;
    margin-bottom: 1rem !important;
}

.ant-modal {

}

@media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
  .am-button {
   width: 15.6rem; 
  } 
}
`;