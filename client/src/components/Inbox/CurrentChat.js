import React, { useEffect, useContext } from "react";
import { CurrentChatContainer } from "./Container";
import { InputBox } from "./InputBox";

import { ChatContext } from "context/ChatContext";
import { RecipientHeader } from "./RecipientHeader";
import Messages from "./Messages";

const CurrentChat = ({
  room,
  getChatLog,
  chatLog,
  loadMore,
  sendMessage,
  deleteMessage,
  editMessage,
  leaveAllRooms,
  user,
}) => {
  const {
    toggleMobileChatList,
    isLoading,
    setIsLoading,
    editingMessageId,
    setEditingMessageId,
    inputExpanded,
    setInputExpanded,
  } = useContext(ChatContext);

  const getReceiver = (participants) => {
    return participants.filter((p) => p.id != user.id)[0];
  };

  const onLoadMoreClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let loadMoreSuccess = await loadMore({
      threadId: room._id,
      skip: chatLog.length,
    });
    if (loadMoreSuccess) setIsLoading(false);
  };

  useEffect(() => {
    if (room)
      getChatLog({
        threadId: room._id,
      });
    setEditingMessageId(null);
  }, [getChatLog, room, setEditingMessageId]);

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
      <RecipientHeader
        status={room?.userStatus || null}
        participant={room ? getReceiver(room.participants) : null}
        onMobileBackClick={leaveAllRooms}
      />
      <Messages
        user={user}
        room={room}
        chatLog={chatLog}
        deleteMessage={deleteMessage}
        editMessage={editMessage}
        onLoadMoreClick={onLoadMoreClick}
        editingMessageId={editingMessageId}
        setEditingMessageId={setEditingMessageId}
        isLoading={isLoading}
        inputExpanded={inputExpanded}
      />
      {room && (
        <InputBox
          threadId={room._id}
          sendMessage={sendMessage}
          inputExpanded={inputExpanded}
          setInputExpanded={setInputExpanded}
        />
      )}
    </CurrentChatContainer>
  );
};

export default CurrentChat;
