import React, { useContext, useEffect, useRef, useState } from "react";
import { Menu, Dropdown } from "antd";
import { Modal } from "antd-mobile";
import {
  InboxContainer,
  CurrentChatContainer,
} from "../components/Inbox/Container";
import { InputBox } from "../components/Inbox/InputBox";
import {
  BubbleContainer,
  MessagesContainer,
  MessageMenu,
  SenderBubble,
  RecipientBubble,
  TimeStamp,
} from "../components/Inbox/Messages";
import { ChatList } from "../components/Inbox/ChatList";
import { RecipientHeader } from "../components/Inbox/RecipientHeader";
import { EmptyInbox } from "../components/Inbox/EmptyInbox";
import { SelectRoom } from "../components/Inbox/SelectRoom";
import { ChatContextProvider } from "../context/ChatContext";
import { ChatContext } from "context/ChatContext";
import { WebSocketContext } from "../context/WebsocketContext";
import { OrgPost } from "../components/Inbox/OrgPost";
import getRelativeTime from "utils/relativeTime";
import moment from "moment";
import subMenuIcon from "assets/icons/submenu.svg";

const GROUP_MESSAGES_TIME_FRAME = 1; // minutes

const CurrentChat = ({
  toggleMobileChatList,
  room,
  getChatLog,
  chatLog,
  loadMore,
  sendMessage,
  deleteMessage,
  leaveAllRooms,
  user,
}) => {
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ block: "start" });
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
  }, [getChatLog, room]);

  const Messages = () => {
    const linkify = (text) => {
      let urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      function urlify(text) {
        if (urlRegex.test(text))
          return (
            <a
              target="_blank"
              key={Math.random().toString(36)}
              href={`//${text}`}
            >
              {text}
            </a>
          );
        else return text;
      }
      let output = [];
      text.split(/(\s+)/).forEach((word) => {
        output.push(urlify(word));
      });
      return output;
    };

    const shouldShowTime = (messageIndex) => {
      // this order is important
      if (chatLog.length == 1) return true;
      if (
        !chatLog[messageIndex + 1] &&
        moment().diff(chatLog[messageIndex].createdAt, "minutes") <=
          GROUP_MESSAGES_TIME_FRAME
      )
        return false;
      if (chatLog[messageIndex].authorId != chatLog[messageIndex + 1]?.authorId)
        return true;
      return (
        moment(chatLog[messageIndex + 1].createdAt).diff(
          chatLog[messageIndex].createdAt,
          "minutes",
        ) >= GROUP_MESSAGES_TIME_FRAME
      );
    };

    const isToday = (date) => {
      return moment(date).isSame(moment(), "day");
    };

    useEffect(() => {
      if (!isLoading) scrollToBottom();
    }, [chatLog.length]); // eslint-disable-line react-hooks/exhaustive-deps

    function showDeleteConfirm(messageId) {
      Modal.alert(
        "Delete the message?",
        "The selected message will be permanently deleted from both you and the recipent's devices. Are you sure you want to delete?",
        [
          { text: "Delete", onPress: () => deleteMessage(messageId) },
          { text: "Cancel", onPress: () => null },
        ],
      );
    }

    const menu = (messageId) => (
      <Menu>
        {/*<Menu.Item>
            Edit
        </Menu.Item>*/}
        <Menu.Item onClick={() => showDeleteConfirm(messageId)} danger>
          Delete
        </Menu.Item>
      </Menu>
    );

    const { chat } = useContext(ChatContext);
    const Sender = ({ postRef, message, messageId, isDeleted }) => {
      return (
        <BubbleContainer key={"b-" + messageId}>
          <SenderBubble className={`${isDeleted ? "deleted" : ""}`}>
            {!isDeleted && (
              <Dropdown overlay={menu(messageId)} placement="bottomRight">
                <MessageMenu>
                  <img src={subMenuIcon} />
                </MessageMenu>
              </Dropdown>
            )}
            {postRef && <OrgPost postRef={postRef} />}
            <div className="message-content-sender">
              {!isDeleted && message
                ? linkify(message)
                : "This message was deleted"}
            </div>
          </SenderBubble>
        </BubbleContainer>
      );
    };
    const Recipient = ({ postRef, message, messageId, isDeleted }) => {
      return (
        <RecipientBubble
          key={"b-" + messageId}
          className={`${isDeleted ? "deleted" : ""}`}
        >
          {postRef && <OrgPost postRef={postRef} />}
          <div className="message-content-recipient">
            {!isDeleted && message
              ? linkify(message)
              : "This message was deleted"}
          </div>
        </RecipientBubble>
      );
    };
    return (
      <MessagesContainer>
        {
          !isLoading && room && chatLog.length >= 20 && !room.loadedAll && (
            <button onClick={onLoadMoreClick} className={"load-more-btn"}>
              load more
            </button>
          ) // to be styled, or changed to infinte scroller
        }
        {chatLog?.map((message, i) => (
          <>
            {message.authorId != user.id ? (
              <Recipient
                key={message._id}
                message={message.content}
                postRef={message.postRef}
                messageId={message._id}
                isDeleted={message.status == "deleted"}
              />
            ) : (
              <Sender
                key={message._id}
                message={message.content}
                postRef={message.postRef}
                messageId={message._id}
                isDeleted={message.status == "deleted"}
              />
            )}
            {shouldShowTime(i) && (
              <TimeStamp
                className={message.authorId != user.id ? "left" : "right"}
              >
                {isToday(message.createdAt)
                  ? getRelativeTime(message.createdAt)
                  : moment(message.createdAt).format("ddd MMM. DD, HH:mm")}
              </TimeStamp>
            )}
          </>
        ))}
        <div id={"messages-bottom"} ref={messagesEndRef}></div>
      </MessagesContainer>
    );
  };

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
      <RecipientHeader
        status={room?.userStatus || null}
        participant={room ? getReceiver(room.participants) : null}
        onMobileBackClick={leaveAllRooms}
      />
      <Messages />
      {room && <InputBox threadId={room._id} sendMessage={sendMessage} />}
    </CurrentChatContainer>
  );
};

const Inbox = (props) => {
  const { empty, toggleMobileChatList, setToggleMobileChatList } = useContext(
    ChatContext,
  );
  const {
    sendMessage,
    deleteMessage,
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
