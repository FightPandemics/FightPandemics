import React, { useRef, useLayoutEffect } from "react";
import { Menu, Dropdown, Typography } from "antd";
import { Modal } from "antd-mobile";
import styled from "styled-components";
import {
  BubbleContainer,
  MessagesContainer,
  MessageMenu,
  SenderBubble,
  RecipientBubble,
  TimeStamp,
} from "./MessagesContainers";
import { OrgPost } from "./OrgPost";
import getRelativeTime from "utils/relativeTime";
import moment from "moment";
import subMenuIcon from "assets/icons/submenu.svg";
import { mq } from "constants/theme";
import { AlertBox } from "./AlertBox";
import { useTranslation } from "react-i18next";
const { Text } = Typography;

const GROUP_MESSAGES_TIME_FRAME = 3; // minutes

const Messages = ({
  setText,
  user,
  room,
  chatLog,
  deleteMessage,
  editMessage,
  onLoadMoreClick,
  toggleViewRequests,
  editingMessageId,
  setEditingMessageId,
  getScrollToBottom,
  inputRef,
  isLoading,
  inputExpanded,
  blockStatus,
  status,
}) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const editTextArea = useRef();
  const [alertBoxData, setAlertBox] = React.useState({});

  const scrollToBottom = React.useCallback(() => {
    const element = messagesEndRef.current;
    if (element) {
      element.scrollTo(0, element?.scrollHeight);
    }
  }, []);

  React.useEffect(() => {
    getScrollToBottom.current = scrollToBottom;
  }, [getScrollToBottom, scrollToBottom]);

  const isMobile = () => {
    return window.screen.width <= parseInt(mq.phone.wide.maxWidth);
  };

  const linkify = (text) => {
    let urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    function urlify(text) {
      if (urlRegex.test(text))
        return (
          <a
            target="_blank"
            key={Math.random().toString(36)}
            href={`${text.startsWith("http") ? "" : "//"}${text}`}
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
    // always show time for latest one
    if (!chatLog[messageIndex + 1]) return true;
    if (
      !chatLog[messageIndex + 1] &&
      moment().diff(chatLog[messageIndex].createdAt, "minutes") <=
        GROUP_MESSAGES_TIME_FRAME
    )
      return false;
    if (chatLog[messageIndex].authorId !== chatLog[messageIndex + 1]?.authorId)
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
    setAlertBox({
      show: true,
      title: t("messaging.deleteMessageQuestion"),
      content: t("messaging.deleteMessageText"),
      action: [
        {
          text: <Text type="danger">{t("messaging.delete")}</Text>,
          onPress: () => {
            deleteMessage(messageId);
            setAlertBox({ show: false });
          },
        },
        {
          text: t("messaging.cancel"),
          onPress: () => setAlertBox({ show: false }),
        },
      ],
    });
  }

  function startMessageEditing(messageId, content) {
    setEditingMessageId(messageId);
    if (isMobile()) {
      setText(content);
      if (inputRef.current && inputRef.current?.focus) {
        inputRef.current.focus();
      }
    }
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

  const menu = React.useCallback(
    (messageId, content) => (
      <Menu key={"menu-" + messageId}>
        {
          <Menu.Item onClick={() => startMessageEditing(messageId, content)}>
            {t("messaging.edit")}
          </Menu.Item>
        }
        <Menu.Item onClick={() => showDeleteConfirm(messageId)} danger>
          {t("messaging.delete")}
        </Menu.Item>
      </Menu>
    ),
    [showDeleteConfirm, startMessageEditing, t],
  );
  const Sender = ({ postRef, message, messageId, isDeleted, isEdited }) => {
    return (
      <BubbleContainer
        className={`${editingMessageId === messageId ? "is-editing" : ""}`}
        key={"b-" + messageId}
      >
        {isEdited && <small>{t("messaging.edited")}</small>}

        <SenderBubble
          editingMode={editingMessageId === messageId}
          className={`${isDeleted ? "deleted" : ""}`}
          onContextMenu={(event) => {
            event.persist();
            event.preventDefault();
            Modal.operation([
              {
                text: t("messaging.edit"),
                onPress: () => {
                  startMessageEditing(messageId, message);
                },
                style: {
                  fontSize: "1.6rem",
                  textAlign: "center",
                  padding: 0,
                },
              },
              {
                text: <Text type="danger">{t("messaging.delete")}</Text>,
                onPress: () => {
                  showDeleteConfirm(messageId);
                },
                style: {
                  fontSize: "1.6rem",
                  textAlign: "center",
                  padding: 0,
                },
              },
            ]);
          }}
        >
          {!isDeleted && editingMessageId !== messageId && (
            <Dropdown
              trigger={["click", "hover"]}
              overlay={menu(messageId, message)}
              placement="bottomRight"
            >
              <MessageMenu>
                <img alt="menu" src={subMenuIcon} />
              </MessageMenu>
            </Dropdown>
          )}
          {postRef && !(!isMobile() && editingMessageId === messageId) && (
            <OrgPost postRef={postRef} />
          )}
          <div className="message-content-sender">
            {!isDeleted && message
              ? linkify(message)
              : t("messaging.didDelete")}
          </div>
          {!isMobile() && editingMessageId === messageId && (
            <textarea
              key={"t-area-" + messageId}
              ref={editTextArea}
              defaultValue={message}
              maxlength={2048}
            ></textarea>
          )}
        </SenderBubble>
        {!isMobile() && editingMessageId === messageId && (
          <div key={"m-edit-" + messageId} className={"edit-controls"}>
            <button onClick={() => cancelMessageEditing()}>
              {t("messaging.cancel")}
            </button>
            <button
              className={"save"}
              onClick={() => saveMessageEditing(messageId)}
            >
              {t("messaging.saveEdit")}
            </button>
          </div>
        )}
      </BubbleContainer>
    );
  };
  const Recipient = ({ postRef, message, messageId, isDeleted, isEdited }) => {
    return (
      <BubbleContainer className={"recipient"} key={"b-" + messageId}>
        <RecipientBubble
          key={"b-" + messageId}
          className={`${isDeleted ? "deleted" : ""}`}
        >
          {postRef && <OrgPost postRef={postRef} />}
          <div className="message-content-recipient">
            {!isDeleted && message
              ? linkify(message)
              : t("messaging.wasDeleted")}
          </div>
        </RecipientBubble>
        {isEdited && <small>{t("messaging.edited")}</small>}
      </BubbleContainer>
    );
  };

  useLayoutEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    }
  }, [room, chatLog.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MessagesContainer
      blockStatus={blockStatus}
      status={status}
      ref={messagesEndRef}
      className={`${toggleViewRequests ? "request-page" : ""} ${
        inputExpanded ? "input-expanded" : ""
      }`}
    >
      {alertBoxData?.show && (
        <AlertBox
          footer={alertBoxData?.action}
          visible={alertBoxData?.show}
          transparent
          title={alertBoxData?.title}
        >
          {alertBoxData?.content}
        </AlertBox>
      )}
      {!isLoading && room && chatLog.length >= 20 && !room.loadedAll && (
        <button onClick={onLoadMoreClick} className={"load-more-btn"}>
          {t("messaging.loadMore")}
        </button>
      )}
      {chatLog?.map((message, i) => (
        <>
          {message.authorId !== user.id ? (
            <Recipient
              key={message._id}
              message={message.content}
              postRef={message.postRef}
              messageId={message._id}
              isDeleted={message.status === "deleted"}
              isEdited={message.status === "edited"}
            />
          ) : (
            <Sender
              key={message._id}
              message={message.content}
              postRef={message.postRef}
              messageId={message._id}
              isDeleted={message.status === "deleted"}
              isEdited={message.status === "edited"}
            />
          )}
          {shouldShowTime(i) && (
            <TimeStamp
              key={"t-" + message._id}
              className={message.authorId !== user.id ? "left" : "right"}
            >
              {isToday(message.createdAt)
                ? getRelativeTime(message.createdAt).replace(
                    "0 seconds ago",
                    t("messaging.justNow"),
                  )
                : moment(message.createdAt).format("ddd MMM. DD, HH:mm")}
            </TimeStamp>
          )}
        </>
      ))}
      {/* <div ref={messagesEndRef} id={"messages-bottom"}></div> */}
    </MessagesContainer>
  );
};
export default Messages;
