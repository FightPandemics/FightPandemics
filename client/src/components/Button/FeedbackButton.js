import { Button } from "antd-mobile";
import styled from "styled-components";
import { theme } from "constants/theme";

const { black, royalBlue, white } = theme.colors;

const FeedbackButton = styled(Button)`
  border: 0.2rem solid ${royalBlue} !important;
  border-radius: 0.8rem;
  cursor: pointer;
  color: ${black};
  padding: 0 0.1rem;
  &:hover,
  &.am-button-active {
    background-color: ${royalBlue};
    color: ${white};
  }
  &.am-button-ghost:before {
    border: none !important;
  }
`;

export default FeedbackButton;
