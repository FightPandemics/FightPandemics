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
import GTM from "constants/gtm-tags";

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
    leaveAllRooms,
    getUserStatus,
    unblockThread,
    blockThread,
    archiveThread,
    ignoreThread,
  } = useContext(WebSocketContext);
  const { user, history, authLoading, isAuthenticated, organisationId } = props;
  const { room, rooms, chatLog } = props.webSocket;
  const dispatch = useDispatch();

  const actor =
    user?.organisations.find((org) => org._id === organisationId) || user;

  const getSender = (participants) => {
    return participants.filter((p) => p.id === (actor._id || actor.id))[0];
  };

  const getReceiver = (participants) => {
    return participants.filter((p) => p.id !== (actor._id || actor.id))[0];
  };

  const pendingRooms = rooms.filter(
    (r) => getSender(r.participants)?.status === "pending",
  );

  const acceptedRooms = rooms.filter(
    (r) => getSender(r.participants)?.status === "accepted",
  );

  const unlisten = history.listen(() => {
    setToggleMobileChatList(true);
    setToggleViewRequests(false);
    setIsSettingsOpen(false);
    leaveAllRooms();
    unlisten();
  });

  useEffect(() => {
    if (history.location.state?.hideMobileChatList)
      setToggleMobileChatList(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ensureLoggedIn = () => {
    if (!authLoading && !isAuthenticated) {
      sessionStorage.setItem("postredirect", "/inbox");
      history.push("/auth/login");
    }
  };

  ensureLoggedIn();

  const toggleSettings = () => {
    if (!isSettingsOpen) {
      setSettingsTab("BLOCKED");
      leaveAllRooms();
    }
    setIsSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    try {
      // removing extra scroll padding-bottom by .am-drawer-content
      document.querySelector(".app-drawer .am-drawer-content").style.padding =
        "0";
    } catch (e) {
      // e
    }
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (room)
      getChatLog({
        threadId: room._id,
      });
  }, [getChatLog, room]); // eslint-disable-next-line react-hooks/exhaustive-deps

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
        user={actor}
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
        pendingRooms={pendingRooms}
        acceptedRooms={acceptedRooms}
      />
      {(() => {
        if (isSettingsOpen) {
          return (
            <Settings
              selectedSettingsTab={selectedSettingsTab}
              rooms={rooms}
              user={actor}
              unblockThread={unblockThread}
              gtmPrefix={GTM.inbox.prefix + GTM.inbox.settings}
            />
          );
        } else {
          if (
            rooms?.length === 0 ||
            (!toggleViewRequests && rooms.length === pendingRooms.length)
            || (!toggleViewRequests && !acceptedRooms.length)
          ) {
            return <EmptyInbox />;
          }
          if (!room) {
            return <SelectRoom isRequestPage={toggleViewRequests} />;
          }
          return (
            <CurrentChat
              room={room}
              receiver={getReceiver(room.participants)}
              sender={getSender(room.participants)}
              user={actor}
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
              ignoreThread={ignoreThread}
            />
          );
        }
      })()}
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
