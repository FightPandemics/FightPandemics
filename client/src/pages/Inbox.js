import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { InboxContainer } from "../components/Inbox/Container";
import { ChatList } from "../components/Inbox/ChatList";
import CurrentChat from "../components/Inbox/CurrentChat";
import Settings from "../components/Inbox/Settings";
import { EmptyInbox } from "../components/Inbox/EmptyInbox";
import { SelectRoom } from "../components/Inbox/SelectRoom";
import { ChatContextProvider } from "../context/ChatContext";
import { ChatContext } from "context/ChatContext";
import { WebSocketContext } from "../context/WebsocketContext";

const Inbox = (props) => {
  const {
    toggleMobileChatList,
    setToggleMobileChatList,
    isSettingsOpen,
    setIsSettingsOpen,
    setSettingsTab,
    selectedSettingsTab,
    toggleViewRequests,
    setToggleViewRequests,
  } = useContext(ChatContext);
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
    unblockThread,
    blockThread,
    archiveThread,
  } = useContext(WebSocketContext);
  const { isIdentified, user, history } = props;
  const { room, rooms, chatLog } = props.ws;
  const dispatch = useDispatch();

  const unlisten = history.listen(() => {
    leaveAllRooms();
    unlisten();
  });

  const getReceiver = (participants) => {
    return participants.filter((p) => p.id != user.id)[0];
  };

  const toggleSettings = () => {
    if (!isSettingsOpen) {
      setSettingsTab("BLOCKED");
      leaveAllRooms();
    }
    setIsSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    if (isIdentified) getUserRooms();
  }, [getUserRooms, isIdentified]);

  useEffect(() => {
    if (room)
      getChatLog({
        threadId: room._id,
      });
  }, [getChatLog, room]);

  useEffect(() => {
    rooms.forEach(async (_room) => {
      if (_room.userStatus)
        return dispatch({
          type: "USER_STATUS_UPDATE",
          payload: {
            id: getReceiver(_room.participants).id,
            status: _room.userStatus,
          },
        });
      let status = await getUserStatus(getReceiver(_room.participants).id);
      dispatch({
        type: "USER_STATUS_UPDATE",
        payload: { id: getReceiver(_room.participants).id, status: status },
      });
    });
  }, [rooms]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InboxContainer>
      <ChatList
        rooms={rooms}
        room={room}
        user={user}
        joinRoom={joinRoom}
        leaveAllRooms={leaveAllRooms}
        toggleMobileChatList={toggleMobileChatList}
        setToggleMobileChatList={setToggleMobileChatList}
        isSettingsOpen={isSettingsOpen}
        toggleSettings={toggleSettings}
        setSettingsTab={setSettingsTab}
        selectedSettingsTab={selectedSettingsTab}
        toggleViewRequests={toggleViewRequests}
        setToggleViewRequests={setToggleViewRequests}
      />
      {isSettingsOpen && (
        <Settings
          selectedSettingsTab={selectedSettingsTab}
          rooms={rooms}
          user={user}
          unblockThread={unblockThread}
        />
      )}
      {!isSettingsOpen && !rooms.length ? (
        <EmptyInbox />
      ) : (
        (!isSettingsOpen && !room && <SelectRoom />) ||
        (!isSettingsOpen && room && (
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
            blockThread={blockThread}
            unblockThread={unblockThread}
            archiveThread={archiveThread}
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
export default withRouter(InboxPage);
