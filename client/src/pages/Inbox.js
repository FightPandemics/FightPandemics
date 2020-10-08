import React, { useContext, useEffect, useRef, useState } from "react";
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

const GROUP_MESSAGES_TIME_FRAME = 15; // minutes

const CurrentChat = ({
  toggleMobileChatList,
  room,
  getChatLog,
  chatLog,
  loadMore,
  sendMessage,
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

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

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

    const prevChatLogLength = usePrevious(chatLog.length);
    useEffect(() => {
      if (!isLoading && chatLog.length != prevChatLogLength) scrollToBottom();
    }, [chatLog.length]); // eslint-disable-line react-hooks/exhaustive-deps

    const { chat } = useContext(ChatContext);
    const Sender = ({ postRef, message }) => {
      return (
        <BubbleContainer key={"b-" + message._id}>
          <SenderBubble>
            {postRef && <OrgPost postRef={postRef} />}
            <div className="message-content-sender">{linkify(message)}</div>
          </SenderBubble>
        </BubbleContainer>
      );
    };
    const Recipient = ({ postRef, message }) => {
      return (
        <RecipientBubble key={"b-" + message._id}>
          {postRef && <OrgPost postRef={postRef} />}
          <div className="message-content-recipient">{linkify(message)}</div>
        </RecipientBubble>
      );
    };
    return (
      <MessagesContainer>
        {
          !isLoading && room && chatLog.length >= 20 && !room.loadedAll && (
            <button onClick={onLoadMoreClick} id={"messages-top"}>
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
              />
            ) : (
              <Sender
                key={message._id}
                message={message.content}
                postRef={message.postRef}
              />
            )}
            {shouldShowTime(i) && (
              <TimeStamp
                className={message.authorId != user.id ? "left" : "right"}
              >
                {isToday(message.createdAt)
                  ? getRelativeTime(message.createdAt)
                  : moment(message.createdAt).format("MMM. DD")}
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

  useEffect(() => {
    // join the first room if not on mobile
    if (!toggleMobileChatList && !room && rooms[0])
      joinRoom({
        threadId: rooms[0]._id,
      });
  }, [rooms]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {!toggleMobileChatList && !rooms.length
        ? <EmptyInbox/> 
        : !toggleMobileChatList && !room && <SelectRoom/> ||
      room && <CurrentChat
        room={room}
        user={user}
        getChatLog={getChatLog}
        chatLog={chatLog}
        loadMore={loadMore}
        sendMessage={sendMessage}
        leaveAllRooms={leaveAllRooms}
        toggleMobileChatList={toggleMobileChatList}
        setToggleMobileChatList={setToggleMobileChatList}
      />}
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
