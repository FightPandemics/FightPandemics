import React, { useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { getInitialsFromFullName } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
import { Container, RefPost } from "./OrgPostRef";
import {
  MsgModal,
  SuccessModal,
  FailedModal,
  PrivateMessageContainer,
} from "./MessagesContainer";
import { LOGIN } from "templates/RouteWithSubRoutes";
import activeemail from "assets/icons/mail.svg";
import { WebSocketContext } from "context/WebsocketContext";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import GTM from "constants/gtm-tags";

const OrgPostRef = ({ title, content, postAuthorName, avatar }) => {
  const { t } = useTranslation();
  const Initials = getInitialsFromFullName(postAuthorName);
  return (
    <Container>
      <RefPost>
        <header>
          <div className="author">
            {t("messaging.to")}:<TextAvatar src={avatar}>{Initials}</TextAvatar>{" "}
            {postAuthorName}
          </div>
          <h3>{title}</h3>
        </header>
        <div className="content">
          {content.length < 80 ? content : `${content.substring(0, 75)}...`}
        </div>
      </RefPost>
    </Container>
  );
};

const MessageModal = ({
  title,
  postContent,
  postAuthorName,
  avatar,
  authorId,
  isAuthenticated,
  postId,
  postInfo,
  isFromProfile,
  gtmPrefix,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [text, setText] = useState("");
  const [msgRsp, setMsgRsp] = useState(true);
  const [threadId, setThreadId] = useState(null);
  const { sendMessage, joinRoom, getUserRooms, leaveAllRooms } = useContext(
    WebSocketContext,
  );
  const textAreaRef = useRef(null);
  let history = useHistory();

  const showModal = async () => {
    await setVisible(true);
    document.querySelector(".ant-modal-root").style.opacity = 0;
    setTimeout(() => {
      document.querySelector(".ant-modal-root").style.opacity = 1;
    }, 400);
  };
  const handleOk = async () => {
    await setConfirmLoading(true);
    let createdThread = await joinRoom({
      receiverId: authorId,
      threadId: null,
    });
    setThreadId(createdThread?._id);
    let confirmation = await sendMessage({
      threadId: createdThread?._id || null,
      content: text,
      postId: postId,
    });
    leaveAllRooms(); // leave the room just joined to keep receive notifications from it.
    getUserRooms(); // update rooms to include the new created one.
    if (confirmation) {
      setMsgSent(true);
      setMsgRsp(true);
      setVisible(false);
      setText("");
      textAreaRef.current.value = "";
      if (postId) {
        TagManager.dataLayer({
          dataLayer: {
            event: "MESSAGE_SENT",
            sentFrom: gtmPrefix,
            ...postInfo,
          },
        });
      }
    } else {
      setMsgSent(true);
      setMsgRsp(false);
      setVisible(false);
    }
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDone = () => {
    setMsgSent(false);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const gtmId =
    gtmPrefix +
    GTM.inbox.message +
    (isFromProfile ? GTM.inbox.profile : GTM.inbox.post);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <PrivateMessageContainer onClick={showModal} id={gtmId}>
            <img src={activeemail} />
            {!isFromProfile && <span>{t("messaging.message")}</span>}
          </PrivateMessageContainer>
          <MsgModal
            title={t("messaging.sendMessage")}
            visible={visible}
            onOk={handleOk}
            okText={t("messaging.send")}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            okButtonProps={{ disabled: !text, id: gtmId + GTM.inbox.sent }}
          >
            {!isFromProfile && (
              <OrgPostRef
                title={title}
                content={postContent}
                postAuthorName={postAuthorName}
                avatar={avatar}
              />
            )}
            <textarea
              ref={textAreaRef}
              placeholder={t("messaging.typeMessage")}
              onChange={handleTextChange}
              maxLength={2048}
            />
          </MsgModal>
          {msgRsp ? (
            <SuccessModal
              title={"🎉 " + t("messaging.sendSuccessHeader")}
              visible={msgSent}
              okText={t("messaging.viewMessage")}
              onCancel={handleDone}
              onOk={() => {
                if (threadId) joinRoom({ threadId });
                history.push("/inbox");
              }}
              cancelText={t("messaging.done")}
              okButtonProps={{ id: gtmId + GTM.inbox.suffix }}
            >
              <p>
                {!isFromProfile
                  ? t("messaging.sendSuccessText", {
                      username: postAuthorName,
                      title: title,
                    })
                  : t("messaging.sendSuccessTextNoPost", {
                      username: postAuthorName,
                    })}
              </p>
            </SuccessModal>
          ) : (
            <FailedModal
              title={"🚧 " + t("messaging.sendFailedHeader")}
              visible={msgSent}
              onCancel={handleDone}
              cancelText={t("messaging.close")}
            >
              <p>
                {!isFromProfile
                  ? t("messaging.sendFailedText", {
                      username: postAuthorName,
                      title: title,
                    })
                  : t("messaging.sendFailedTextNoPost", {
                      username: postAuthorName,
                    })}
              </p>
            </FailedModal>
          )}
        </div>
      ) : (
        <Link
          onClick={() =>
            sessionStorage.setItem("postredirect", `/post/${postId}`)
          }
          to={{
            pathname: LOGIN,
            state: { from: window.location.href },
          }}
        >
          <PrivateMessageContainer id={gtmId}>
            <img src={activeemail} />
            <span>{t("messaging.message")}</span>
          </PrivateMessageContainer>
        </Link>
      )}
    </>
  );
};

export default MessageModal;
