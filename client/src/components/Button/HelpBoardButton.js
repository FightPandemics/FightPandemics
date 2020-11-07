import styled from "styled-components";
import BaseButton from "./BaseButton";
import { theme, mq } from "constants/theme";
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
  margin: 5rem auto 13rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-top: 2.5rem;
    margin-bottom: 6rem;
  }

  &:hover {
    background-color: ${white};
    color: ${royalBlue};
    border-color: ${royalBlue};
    border: 1px solid;
    transition: 0.3s all;
  }

  a {
    transition: none;
    &:hover {
      color: ${royalBlue};
    }
  }
`;

export default HelpBoardButton;
