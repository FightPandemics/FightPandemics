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

const OrgPostRef = ({ title, content, postAuthorName, avatar }) => {
  const Initials = getInitialsFromFullName(postAuthorName);
  return (
    <Container>
      <RefPost>
        <header>
          <div className="author">
            To:<TextAvatar src={avatar}>{Initials}</TextAvatar> {postAuthorName}
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
  isFromProfile,
}) => {
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
  return (
    <>
      {isAuthenticated ? (
        <div>
          <PrivateMessageContainer onClick={showModal}>
            <img src={activeemail} />
            {!isFromProfile && <span>Message</span>}
          </PrivateMessageContainer>
          <MsgModal
            title="Send a message"
            visible={visible}
            onOk={handleOk}
            okText="Send"
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            okButtonProps={{ disabled: !text }}
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
              placeholder="Type a message..."
              onChange={handleTextChange}
              maxLength={2048}
            />
          </MsgModal>
          {msgRsp ? (
            <SuccessModal
              title="🎉 Your message was successfully sent"
              visible={msgSent}
              okText="View message"
              onCancel={handleDone}
              onOk={() => {
                if (threadId) joinRoom({ threadId });
                history.push("/inbox");
              }}
              cancelText="Done"
            >
              <p>
                Your message to {postAuthorName}{" "}
                {!isFromProfile && `concerning the "${title}"`} was sent
                succesfully.
              </p>
            </SuccessModal>
          ) : (
            <FailedModal
              title="🚧  Oops, something went wrong"
              visible={msgSent}
              onCancel={handleDone}
              cancelText="Close"
            >
              <p>
                Your message to {postAuthorName}{" "}
                {!isFromProfile && `concerning the "${title}"`} was not sent
                succesfully. Please try again later.
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
          <PrivateMessageContainer>
            <img src={activeemail} />
            <span>Message</span>
          </PrivateMessageContainer>
        </Link>
      )}
    </>
  );
};

export default MessageModal;
