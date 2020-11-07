import styled from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "constants/theme";
const { royalBlue, white, black } = theme.colors;
const { display } = theme.typography.font.family;

const LinkButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  max-width: 32.7rem;
  width: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${white};
    color: ${royalBlue};
    border-color: ${royalBlue};
    border: 1px solid;
    transition: 0.3s all;
  }
`;

export default LinkButton;
