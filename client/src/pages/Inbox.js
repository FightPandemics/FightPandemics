import React from "react";
import styled from "styled-components";
import TextAvatar from "components/TextAvatar";

const InboxContainer = styled.div`
  width: 93%;
  min-height: 37em;
  background-color: white;
  display: flex;
`;
const ChatList = () => {
  const ChatListContainer = styled.div`
    position: relative;
    border-right: 1px solid rgba(232, 232, 232, 0.7);
    width: 25%;
    height: 100%;
    min-width: 22em;
    max-width: 24em;
  `;
  const ChatHeader = styled.div`
    border-bottom: 1px solid rgba(232, 232, 232, 0.7);
    padding: 1.6em 1.1em;
    font-size: 16px;
    font-weight: 700;
  `;
  const SideChats = () => {
    const SideChatContainer = styled.div`
      padding: 0.4em 1.1em;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      display: flex;
      height: 6em;
      align-items: center;
      cursor: pointer;
      :hover {
        background: #f3f4fe;
      }
      :focus {
        border-left: 3px solid #425af2;
        background: #f3f4fe;
      }
      .ant-avatar {
        width: 3.8rem;
        height: 3.8rem;
        line-height: 3.8rem;
      }
      header {
        display: flex;
        line-height: 0.4;
        span {
          position: relative;
          right: 3.8em;
        }
        h4 {
          position: relative;
          right: 0.6em;
          font-weight: 600;
        }
        h5 {
          position: relative;
          left: 11em;
          top: 0.1em;
          color: gray;
          font-weight: 300;
          letter-spacing: 0.3px;
        }
      }
      content {
        position: relative;
        top: 0.9em;
        line-height: 1.5;
        .title {
          font-size: 14px;
          font-weight: 500;
        }
        .message {
          opacity: 0.7;
          letter-spacing: 0.4px;
        }
      }
    `;
    return (
      <SideChatContainer tabIndex="1">
        <TextAvatar>LL</TextAvatar>
        <content>
          <header>
            <span>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#425AF2" />
              </svg>
            </span>
            <h4>Lily Luke</h4>
            <h5>Aug 22</h5>
          </header>
          <div className="content">
            <div className="title">Offering disinfecting clorox...</div>
            <p className="message">Let me know if you still need...</p>
          </div>
        </content>
      </SideChatContainer>
    );
  };

  return (
    <ChatListContainer>
      <ChatHeader>Messages</ChatHeader>
      <div style={{ overflow: "auto", height: "490px" }}>
        <SideChats />
        <SideChats />
        <SideChats />
      </div>
    </ChatListContainer>
  );
};

const CurrentChat = () => {
  const CurrentChatContainer = styled.div`
    width: 100%;
    height: 100%;
  `;
  const RecipientHeader = () => {
    const Recipient = styled.div`
      width: 100%;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      height: 3.5em;
      position: relative;
      top: 0px;
      display: flex;
      align-items: center;
      padding-left: 1em;
      .ant-avatar {
        width: 3.2rem;
        height: 3.2rem;
        line-height: 3.2rem;
        font-size: 13px;
      }
      h4 {
        position: relative;
        top: 0.2em;
        font-size: 15px;
        font-weight: 600;
      }
    `;
    return (
      <Recipient>
        <TextAvatar>LL</TextAvatar>
        <h4>Lily Luke</h4>
      </Recipient>
    );
  };

  const SelectedThread = () => {
    const MessageInput = styled.input`
      width: 891px;
      height: 48px;
      border-radius: 8px;
      border: solid 1px #d7d7d7;
      padding: 1em;
      position: relative;
      top: 34em;
      left: 2em;
      ::placeholder {
        opacity: 0.7;
        letter-spacing: 0.8px;
      }
    `;
    return (
      <>
        <MessageInput placeholder="Type a message..." />
      </>
    );
  };
  return (
    <CurrentChatContainer>
      <RecipientHeader />
      <SelectedThread />
    </CurrentChatContainer>
  );
};

const Inbox = () => {
  return (
    <InboxContainer>
      <ChatList />
      <CurrentChat />
    </InboxContainer>
  );
};

export default Inbox;
