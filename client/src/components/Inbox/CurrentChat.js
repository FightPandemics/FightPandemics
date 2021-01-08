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
  ignoreThread,
  unblockThread,
  user,
  sender,
  receiver,
}) => {
  const {
    toggleMobileChatList,
    text,
    setText,
    isLoading,
    setIsLoading,
    editingMessageId,
    setEditingMessageId,
    inputExpanded,
    setInputExpanded,
    toggleViewRequests,
    setToggleViewRequests,
  } = useContext(ChatContext);

  const scrollToBottom = React.useRef(null);
  const inputRef = React.useRef(null);

  const onLoadMoreClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let loadMoreSuccess = await loadMore({
      threadId: room._id,
      skip: chatLog.length,
    });
    if (loadMoreSuccess)
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  };

  useEffect(() => {
    if (room)
      getChatLog({
        threadId: room._id,
      });
    setEditingMessageId(null);
  }, [getChatLog, room]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const getThreadBlockStatus = () => {
    if (sender.status == "blocked") return "did-block";
    if (receiver.status == "blocked")
      return "was-blocked";
    else return null;
  };

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
      <RecipientHeader
        threadId={room?._id}
        status={room?.userStatus || null}
        participant={room ? receiver : null}
        onMobileBackClick={leaveAllRooms}
        blockThread={blockThread}
        unblockThread={unblockThread}
        blockStatus={getThreadBlockStatus()}
        archiveThread={archiveThread}
        senderIsPending={sender.status === "pending"}
        receiverIsPending={receiver.status === "pending"}
      />
      <Messages
        setText={setText}
        user={user}
        room={room}
        chatLog={chatLog}
        deleteMessage={deleteMessage}
        editMessage={editMessage}
        onLoadMoreClick={onLoadMoreClick}
        editingMessageId={editingMessageId}
        setEditingMessageId={setEditingMessageId}
        toggleViewRequests={toggleViewRequests}
        isLoading={isLoading}
        getScrollToBottom={scrollToBottom}
        inputExpanded={inputExpanded}
        inputRef={inputRef}
        blockStatus={getThreadBlockStatus()}
        status={sender.status}
      />
      {room && (
        <InputBox
          text={text}
          setText={setText}
          user={user}
          sender={sender}
          receiver={receiver}
          room={room}
          scrollToBottom={scrollToBottom?.current}
          sendMessage={sendMessage}
          inputExpanded={inputExpanded}
          setInputExpanded={setInputExpanded}
          blockStatus={getThreadBlockStatus()}
          leaveAllRooms={leaveAllRooms}
          unblockThread={unblockThread}
          blockThread={blockThread}
          ignoreThread={ignoreThread}
          setToggleViewRequests={setToggleViewRequests}
          editingMessageId={editingMessageId}
          setEditingMessageId={setEditingMessageId}
          editMessage={editMessage}
          inputRef={inputRef}
        />
      )}
    </CurrentChatContainer>
  );
};

export default CurrentChat;
