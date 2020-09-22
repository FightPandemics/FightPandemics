import styled from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "constants/theme";
const { royalBlue, white, black } = theme.colors;
const { display } = theme.typography.font.family;

const HelpBoardButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  width: 22.7rem;
  height: 5.4rem;
  border-radius: 4.6rem;
  border: solid 0 ${black};
  font-family: ${display};
  font-size: 1.8rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${white};
  background-color: ${royalBlue};
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 24rem;
  display: flex;
  justify-content: center;
`;

export default HelpBoardButton;
