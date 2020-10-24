import styled from "styled-components";
import { mq } from "constants/theme";

export const InboxContainer = styled.div`
  width: 100%;
  min-width: 100vw;
  height: calc(100vh - 6rem);
  position: relative;
  background-color: white;
  display: flex;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100vw;
    min-width: 30rem;
    height: calc(100% - 5rem);
  }
`;
export const ChatHeader = styled.div`
  border-bottom: 0.1rem solid rgba(232, 232, 232, 0.7);
  padding: 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;

  ${({ type }) => {
    if (type === "subHeader") {
      return `
      cursor: pointer;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 1.8rem;
      `;
    }
    return "";
  }}

  img {
    padding: 0;
    height: 2.4rem;
    width: 2.4rem;
    margin-right: 1.6rem;
  }
  span {
    margin-left: 1.4rem;
    background-color: #425af2;
    border-radius: 50%;
    padding: 0 0.8rem;
    color: white;
    font-size: 1.4rem;
    font-weight: 400;
    min-width: 2.4rem;
    min-height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CurrentChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 11rem);
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    position: absolute;
    display: ${(props) => (props.toggleMobileChatList ? "none" : "flex")};
    height: calc(100% - 6rem);
    bottom: 0;
  }
`;

export const ChatListContainer = styled.div`
  position: relative;
  border-right: 1px solid rgba(232, 232, 232, 0.7);
  height: 100%;
  width: 33.6rem;
  min-width: 33.6rem;

  .chat-bucket {
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100%;
    max-width: 100vw;
    margin-top: 10px;
    position: absolute;
    top: 0;
    height: 100%;
    display: ${(props) =>
      props.toggleMobileChatList || props.toggleSettingstList
        ? "block"
        : "none"};
    width: ${(props) => (props.toggleMobileChatList ? "100%" : "25%")};
    max-width: ${(props) => (props.toggleMobileChatList ? "100vw" : "22em")};
  }
`;

export const SideChatContainer = styled.div`
  padding: 1rem;
  border-bottom: 0.1rem solid rgba(232, 232, 232, 0.7);
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
  line-height: 1.8rem;
  padding-left: 1.6rem;

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
    padding-left: 2rem;
    content {
      .message {
        color: #425af2;
      }
    }
  }

  .ant-badge {
    margin-top: 0.5rem;
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
    align-items: center;
    display: flex;
    justify-content: space-between;

    h4 {
      position: relative;
      font-weight: 500;
      max-width: 80%;
    }
    h5 {
      color: gray;
      font-weight: 300;
      letter-spacing: 0.3px;
      margin: 0;
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
    width: calc(100% - 5.5rem);
    display: flex;
    flex-direction: column;

    .title {
      font-size: 1.4rem;
      font-weight: 400;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1;
    }
    .message {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #939393;
      letter-spacing: 0.4px;
      margin-bottom: 0;
    }
  }
`;
