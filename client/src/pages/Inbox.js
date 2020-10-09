import React, { useContext, useEffect, useRef, useState } from "react";
import { InboxContainer } from "../components/Inbox/Container";
import { ChatList } from "../components/Inbox/ChatList";
import CurrentChat from "../components/Inbox/CurrentChat";
import { EmptyInbox } from "../components/Inbox/EmptyInbox";
import { SelectRoom } from "../components/Inbox/SelectRoom";
import { ChatContextProvider } from "../context/ChatContext";
import { ChatContext } from "context/ChatContext";
import { WebSocketContext } from "../context/WebsocketContext";

const Inbox = (props) => {
  const { empty, toggleMobileChatList, setToggleMobileChatList } = useContext(
    ChatContext,
  );
  const {
    sendMessage,
    deleteMessage,
    editMessage,
    joinRoom,
    getChatLog,
    loadMore,
    getUserRooms,
    leaveAllRooms,
    getUserStatus,
  } = useContext(WebSocketContext);
  const { isIdentified, user } = props;
  const { room, rooms, chatLog } = props.ws;

  useEffect(() => {
    if (isIdentified) getUserRooms();
  }, [getUserRooms, isIdentified]);

  return (
    <InboxContainer>
      <ChatList
        empty={empty}
        rooms={rooms}
        room={room}
        user={user}
        joinRoom={joinRoom}
        getUserStatus={getUserStatus}
        toggleMobileChatList={toggleMobileChatList}
        setToggleMobileChatList={setToggleMobileChatList}
      />
      {!rooms.length ? (
        <EmptyInbox />
      ) : (
        (!room && <SelectRoom />) ||
        (room && (
          <CurrentChat
            room={room}
            user={user}
            getChatLog={getChatLog}
            chatLog={chatLog}
            loadMore={loadMore}
            sendMessage={sendMessage}
            deleteMessage={deleteMessage}
            editMessage={editMessage}
            leaveAllRooms={leaveAllRooms}
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
        ))
      )}
    </InboxContainer>
  );
};

const InboxPage = (props) => {
  return (
    <ChatContextProvider>
      <Inbox {...props} />
    </ChatContextProvider>
  );
};

export default InboxPage;
