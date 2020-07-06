import styled from "styled-components";
import { theme, mq } from "constants/theme";
import BaseButton from "components/Button/BaseButton";

const { white, royalBlue } = theme.colors;
const WizardSubmit = styled(BaseButton)`
  border-radius: 4rem;
  align-self: center;
  cursor: pointer;
  color: ${white};
  padding: 0 0.1rem;
  background-color: ${royalBlue};
  width: inherit;
  transition: all .1s;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: ${white};
    color: ${royalBlue};
  }

  &:active {
    transform: translateY(.1rem);
  }
  
  html body &.am-button {
    border: 0.2rem solid ${royalBlue};
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    width: 40.8rem;
  `;

export default WizardSubmit;
