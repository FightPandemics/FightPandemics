import styled from "styled-components";
import BaseButton from "./BaseButton";

const PopUpButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  width: 327px;
  height: 54.6px;
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
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export default PopUpButton;