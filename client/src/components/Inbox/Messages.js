import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const BubbleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const MessagesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  min-height: 40%;
  padding: 0em 1em 1em 1em;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-bottom: 6em;
  a {
    text-decoration: underline;
    &:hover {
      color: inherit;
      opacity: 0.7;
    }
  }
`;

export const SenderBubble = styled.div`
  display: inline-block;
  max-width: 60%;
  background-color: #425af2;
  padding: 0.8em 0.1em 0.8em 0.1em;
  border-radius: 1em 1em 0.1em 1em;
  letter-spacing: 1px;
  margin-top: 1em;
  word-break: break-word;
  color: #fff;
  .message-content-sender {
    margin: 0em 1em 0em 1em;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 70%;
  }
`;

export const RecipientBubble = styled.div`
  display: inline-block;
  max-width: 60%;
  background-color: #f6f7fb;
  padding: 0.8em 0.1em 0.8em 0.1em;
  border-radius: 0.1em 1em 1em 1em;
  letter-spacing: 1px;
  margin-top: 1em;
  word-break: break-word;
  .message-content-recipient {
    margin: 0em 1em 0em 1em;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 70%;
  }
`;

export const TimeStamp = styled.small`
  color: #969292;
  padding: 2px 1rem;
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
`;
