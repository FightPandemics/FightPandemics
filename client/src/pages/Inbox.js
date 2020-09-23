import React, { useContext } from "react";
import {
  InboxContainer,
  CurrentChatContainer,
} from "../components/Inbox/Container";
import { InputBox } from "../components/Inbox/InputBox";
import {
  BubbleContainer,
  MessagesContainer,
  SenderBubble,
  RecipientBubble,
} from "../components/Inbox/Messages";
import { ChatList } from "../components/Inbox/ChatList";
import { RecipientHeader } from "../components/Inbox/RecipientHeader";
import { EmptyInbox } from "../components/Inbox/EmptyInbox";
import { ChatContextProvider } from "../context/ChatContext";
import { ChatContext } from "context/ChatContext";
import { OrgPost } from "../components/Inbox/OrgPost";

const CurrentChat = ({ toggleMobileChatList }) => {
  const Messages = () => {
    const { chat } = useContext(ChatContext);
    const Sender = ({ fromPost, message }) => {
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
      return (
        <RecipientBubble>
          {fromPost ? (
            <>
              <OrgPost />
              <div className="message-content-recipient">
                Hi here! I'd like to help out!
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
            {/* <Recipient /> */}
            <Sender message={message} />
          </>
        ))}
      </MessagesContainer>
    );
  };

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
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
