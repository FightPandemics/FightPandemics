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
  blockThread,
  archiveThread,
  unblockThread,
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
    setToggleViewRequests,
  } = useContext(ChatContext);

  const getSender = (participants) => {
    return participants.filter((p) => p.id == user.id)[0];
  };

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

  const getThreadBlockStatus = () => {
    if (getSender(room.participants).status == "blocked") return "did-block";
    if (getReceiver(room.participants).status == "blocked")
      return "was-blocked";
    else return null;
  };

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
      <RecipientHeader
        threadId={room?._id}
        status={room?.userStatus || null}
        participant={room ? getReceiver(room.participants) : null}
        onMobileBackClick={leaveAllRooms}
        blockThread={blockThread}
        unblockThread={unblockThread}
        blockStatus={getThreadBlockStatus()}
        archiveThread={archiveThread}
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
          user={user}
          room={room}
          sendMessage={sendMessage}
          inputExpanded={inputExpanded}
          setInputExpanded={setInputExpanded}
          blockStatus={getThreadBlockStatus()}
          leaveAllRooms={leaveAllRooms}
          unblockThread={unblockThread}
          blockThread={blockThread}
          archiveThread={archiveThread}
          setToggleViewRequests={setToggleViewRequests}
        />
      )}
    </CurrentChatContainer>
  );
};

export default CurrentChat;
