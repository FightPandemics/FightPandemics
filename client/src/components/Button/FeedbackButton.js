import { Button } from "antd-mobile";
import styled from "styled-components";
import { theme } from "constants/theme";

const { black, royalBlue, white } = theme.colors;

const FeedbackButton = styled(Button)`
  border-radius: 0.8rem;
  cursor: pointer;
  color: ${black};
  padding: 0 0.1rem;
  background: ${white};
  &:hover,
  &.am-button-active {
    background-color: ${royalBlue};
    color: ${white};
  }
  html body &.am-button {
    border: 0.2rem solid ${royalBlue};
  }
`;

export default FeedbackButton;
