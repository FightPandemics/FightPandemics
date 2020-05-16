import { Button } from "antd-mobile";
import styled from "styled-components";

const FeedbackButton = styled(Button)`
  border: 0.2rem solid #425af2 !important;
  border-radius: 0.8rem;
  cursor: pointer;
  color: #000;
  padding: 0 0.1rem;
  &:hover,
  &.am-button-active {
    background-color: #425af2;
    color: #fff;
  }
  &.am-button-ghost:before {
    border: none !important;
  }
`;

export default FeedbackButton;
