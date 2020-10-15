import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const InboxContainer = styled.div`
  width: 100%;
  min-width: 50em;
  min-height: 37em;
  height: calc(100% - 7rem);
  position: absolute;
  background-color: white;
  display: flex;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100vw;
    min-width: 20em;
    height: calc(100% - 5rem);
    position: fixed;
    bottom: 0;
  }
`;
export const ChatHeader = styled.div`
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  padding: 1.6em 1.1em;
  font-size: 1.143em;
  font-weight: 700;
  span {
    margin-left: 1em;
    background-color: #425af2;
    border-radius: 50%;
    padding: 0em 0.6em;
    color: white;
    font-size: 0.9em;
    font-weight: 400;
    min-width: 2em;
    min-height: 2em;
  }
`;

export const CurrentChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: ${(props) => (props.toggleMobileChatList ? "none" : "flex")};
  }
`;

export const ChatListContainer = styled.div`
  position: relative;
  border-right: 1px solid rgba(232, 232, 232, 0.7);
  width: 25%;
  height: 100%;
  min-width: 22em;
  max-width: 24em;
  .chat-bucket {
    overflow: auto;
    height: 35em;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: ${(props) =>
      props.toggleMobileChatList || props.toggleSettingstList
        ? "block"
        : "none"};
    width: ${(props) => (props.toggleMobileChatList ? "100%" : "25%")};
    max-width: ${(props) => (props.toggleMobileChatList ? "100vw" : "22em")};
  }
`;

export const SideChatContainer = styled.div`
  padding: 0.4em 1.1em;
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  display: flex;
  height: 6em;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    justify-content: ${(props) =>
      props.toggleMobileChatList ? "center" : null};
  }
  :hover {
    background: #f3f4fe;
  }
  :focus,
  &.selected {
    border-left: 3px solid #425af2;
    background: #f3f4fe;
  }
  .ant-avatar {
    width: 3.8rem;
    height: 3.8rem;
    line-height: 3.8rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .status-indicator {
    position: absolute;
    left: 2.3rem;
    margin-top: -1.2rem;
    background: #cecece;
    border-radius: 100%;
    height: 1.4rem;
    width: 1.4rem;
    border: 0.25rem solid #fff;
    &.online {
      background: lightgreen;
    }
  }
  header {
    display: flex;
    line-height: 0;
    h4 {
      position: relative;
      font-weight: 600;
      max-width: 80%;
    }
    h5 {
      position: absolute;
      right: 0em;
      top: 0em;
      color: gray;
      font-weight: 300;
      letter-spacing: 0.3px;
    }
    .unread-indicator {
      position: absolute;
      right: -1rem;
      top: calc(50% - 1.5rem);
      background: #425af2;
      color: #f3f4fe;
      height: 1rem;
      width: 1rem;
      border-radius: 100%;
      text-align: center;
      line-height: 2rem;
    }
  }
  content {
    position: relative;
    top: 0.9em;
    line-height: 1.5;
    width: calc(100% - 5.5rem);
    .title {
      font-size: 1em;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .message {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #085fff;
      opacity: 0.7;
      letter-spacing: 0.4px;
    }
  }
`;
