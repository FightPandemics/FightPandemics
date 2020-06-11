import styled from 'styled-components';
import { theme } from "constants/theme";
import BaseButton from "components/Button/BaseButton";

const { white, royalBlue } = theme.colors;
const WizardSubmit = styled(BaseButton)`
border-radius: 4rem;
margin-right: 7rem;
margin-left: 7rem;
  cursor: pointer;
  color: ${white};
  padding: 0 0.1rem;
  background-color: ${royalBlue};
  &:hover,
  &.am-button-active {
    background-color: ${royalBlue};
    color: ${white};
  } 
  html body &.am-button {
    border: 0.2rem solid ${royalBlue};
  }
  `;

export default WizardSubmit;
