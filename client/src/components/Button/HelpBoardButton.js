import styled from "styled-components";
import BaseButton from "./BaseButton";

const HelpBoardButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  width: 227px;
  height: 54px;
  border-radius: 46px;
  border: solid 0 #000000;
  font-family: Poppins;
  font-size: 18px;
  font-weight : 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color:#ffffff;
  background-color:#425af2;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 259.9px;
  display: flex;
  justify-content: center;  
`;

export default HelpBoardButton;