import React, { useContext, useEffect, useState } from "react";
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
import { WebSocketContext } from "../context/WebsocketContext";
import { OrgPost } from "../components/Inbox/OrgPost";

const CurrentChat = ({ toggleMobileChatList, room, getChatLog, chatLog, newMessage, sendMessage, user }) => {

  const getReceiverId = (participants) => {
    return participants.filter(p=>p.id!=user.id)[0].id
  }
  const getReceiverName = (participants) => {
    return participants.filter(p=>p.id!=user.id)[0].name
  }

  useEffect(()=>{
    if (room) getChatLog({
      receiverId: getReceiverId(room.participants)
    })
  }, [room])

  useEffect(()=>{
    console.log(newMessage)

  }, [newMessage])

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
    const Recipient = ({fromPost, message}) => {
      return (
        <RecipientBubble>
          {fromPost ? (
            <>
              <OrgPost />
              <div className="message-content-recipient">
              {message}
              </div>
            </>
          ) : (
            <div className="message-content-recipient">{message}</div>
          )}
        </RecipientBubble>
      );
    };
    return (
      <MessagesContainer>
        {chatLog?.map((message) => (
          <>
          { message.authorId != user.id ? (
            <Recipient key={message._id} message={message.content} />
          ):(
            <Sender key={message._id} message={message.content} />
          )
          }
          </>
      ))}
      </MessagesContainer>
    );
  };

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
      <RecipientHeader name={room?getReceiverName(room.participants):null}/>
      <Messages />
      {room && <InputBox receiverId={room?getReceiverId(room.participants):null} sendMessage={sendMessage} />}
    </CurrentChatContainer>
  );
};


const Inbox = (props) => {
  const { empty, toggleMobileChatList, setToggleMobileChatList } = useContext(
    ChatContext,
  );
  const { sendMessage, joinRoom, getChatLog, getUserRooms } = useContext(
    WebSocketContext,
  );

  const { isIdentified, user } = props
  const { room, rooms, chatLog } = props.ws

  useEffect(()=>{
    if (isIdentified) getUserRooms()
  },[isIdentified])


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
            rooms={rooms}
            room={room}
            user={user}
            joinRoom={joinRoom}
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
          <CurrentChat
            room={room}
            user={user}
            getChatLog={getChatLog}
            chatLog={chatLog}
            sendMessage={sendMessage}
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
        </>
      )}
    </InboxContainer>
  );
};

const InboxPage = (props) => {
  return (
    <ChatContextProvider>
      <Inbox  {...props}/>
    </ChatContextProvider>
  );
};

export default InboxPage;