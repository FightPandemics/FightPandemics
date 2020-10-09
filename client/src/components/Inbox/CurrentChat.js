import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Menu, Dropdown } from "antd";
import { Modal } from "antd-mobile";
import { CurrentChatContainer } from "./Container";
import { InputBox } from "./InputBox";
import {
  BubbleContainer,
  MessagesContainer,
  MessageMenu,
  SenderBubble,
  RecipientBubble,
  TimeStamp,
} from "./Messages";
import { RecipientHeader } from "./RecipientHeader";
import { OrgPost } from "./OrgPost";
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
  editMessage,
  leaveAllRooms,
  user,
}) => {
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const editTextArea = useRef();

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

    // messages time grouping
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

    function startMessageEditing(messageId, content) {
      setEditingMessageId(messageId);
    }

    function cancelMessageEditing() {
      setEditingMessageId(null);
    }

    function saveMessageEditing(messageId) {
      if (!editTextArea.current.value.replace(/\s/g, ""))
        return cancelMessageEditing();
      editMessage({ messageId, newContent: editTextArea.current.value });
      setEditingMessageId(null);
    }

    const menu = (messageId, content) => (
      <Menu>
        {
          <Menu.Item onClick={() => startMessageEditing(messageId, content)}>
            Edit
          </Menu.Item>
        }
        <Menu.Item onClick={() => showDeleteConfirm(messageId)} danger>
          Delete
        </Menu.Item>
      </Menu>
    );

    const Sender = ({ postRef, message, messageId, isDeleted }) => {
      return (
        <BubbleContainer
          className={`${editingMessageId == messageId ? "is-editing" : ""}`}
          key={"b-" + messageId}
        >
          <SenderBubble className={`${isDeleted ? "deleted" : ""}`}>
            {!isDeleted && editingMessageId != messageId && (
              <Dropdown
                overlay={menu(messageId, message)}
                placement="bottomRight"
              >
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
            {editingMessageId == messageId && (
              <textarea ref={editTextArea} defaultValue={message}></textarea>
            )}
          </SenderBubble>
          {editingMessageId == messageId && (
            <div className={"edit-controls"}>
              <button onClick={() => cancelMessageEditing()}>Cancel</button>
              <button
                className={"save"}
                onClick={() => saveMessageEditing(messageId)}
              >
                Save changes
              </button>
            </div>
          )}
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

    useLayoutEffect(() => {
      scrollToBottom();
    }, []);

    return (
      <MessagesContainer>
        {!isLoading && room && chatLog.length >= 20 && !room.loadedAll && (
          <button onClick={onLoadMoreClick} className={"load-more-btn"}>
            load more
          </button>
        )}
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
        <div ref={messagesEndRef} id={"messages-bottom"}></div>
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

export default CurrentChat;
