import React, { useState, useContext } from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import { InboxContainer } from "../components/Inbox/Container";
import { InputBox } from "../components/Inbox/InputBox";
import { ChatList } from "../components/Inbox/ChatList";
import { RecipientHeader } from "../components/Inbox/RecipientHeader";
import { EmptyInbox } from "../components/Inbox/EmptyInbox";
import { ChatContextProvider } from "../context/ChatContext";
import { ChatContext } from "context/ChatContext";
import { OrgPost } from "../components/Inbox/OrgPost";

const CurrentChat = ({ toggleMobileChatList, setToggleMobileChatList }) => {
  const CurrentChatContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: ${toggleMobileChatList ? "none" : "flex"};
    }
  `;

  const Messages = () => {
    const { chat } = useContext(ChatContext);
    const BubbleContainer = styled.div`
      display: flex;
      justify-content: flex-end;
    `;
    const MessagesContainer = styled.div`
      position: relative;
      width: 100%;
      height: 80%;
      min-height: 40%;
      padding: 0em 1em 1em 1em;
      display: flex;
      flex-direction: column;
      overflow: auto;
      margin-bottom: 6em;
    `;
    const Sender = ({ fromPost, message }) => {
      const SenderBubble = styled.div`
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
      return (
        <BubbleContainer>
          <SenderBubble>
            {fromPost ? (
              <>
                <OrgPost />
                <div className="message-content-sender">{message}</div>
              </>
            ) : (
              <div className="message-content-sender">{message}</div>
            )}
          </SenderBubble>
        </BubbleContainer>
      );
    };
    const Recipient = (fromPost) => {
      const RecipientBubble = styled.div`
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

      return (
        <RecipientBubble>
          {fromPost ? (
            <>
              <OrgPost />
              <div className="message-content-recipient">
                Hi here!I'd like to help out!
              </div>
            </>
          ) : (
            <div className="message-content-recipient">{/* {message} */}</div>
          )}
        </RecipientBubble>
      );
    };
    return (
      <MessagesContainer>
        {chat?.map((message) => (
          <>
            <Recipient />
            <Sender message={message} />
            <Sender fromPost />
          </>
        ))}
      </MessagesContainer>
    );
  };

  return (
    <CurrentChatContainer>
      <RecipientHeader />
      <Messages />
      <InputBox />
    </CurrentChatContainer>
  );
};

const Inbox = () => {
  const { empty, toggleMobileChatList, setToggleMobileChatList } = useContext(
    ChatContext,
  );
  return (
    <InboxContainer>
      {empty ? (
        <>
          <ChatList empty={empty} />
          <EmptyInbox />
        </>
      ) : (
        <>
          <ChatList
            empty={empty}
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
          <CurrentChat
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
        </>
      )}
    </InboxContainer>
  );
};

const InboxPage = () => {
  return (
    <ChatContextProvider>
      <Inbox />
    </ChatContextProvider>
  );
};

export default InboxPage;
