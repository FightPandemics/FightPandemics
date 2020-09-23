import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getInitialsFromFullName } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
import { Container, RefPost } from "./OrgPostRef";
import {
  MsgBtn,
  MsgModal,
  SuccessModal,
  FailedModal,
  PrivateMessageContainer,
} from "./MessagesContainer";
import { LOGIN } from "templates/RouteWithSubRoutes";
import activeemail from "assets/icons/active-email.svg";

const OrgPostRef = ({ title, content, postAuthor }) => {
  const Avatar = getInitialsFromFullName(postAuthor);

  return (
    <Container>
      <RefPost>
        <header>
          <div className="author">
            To:<TextAvatar>{Avatar}</TextAvatar> {postAuthor}
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
  postAuthor,
  isAuthenticated,
  postId,
}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [text, setText] = useState("");
  const [msgRsp, setMsgRsp] = useState(true);
  const showModal = async () => {
    await setVisible(true);
    document.querySelector(".ant-modal-root").style.opacity = 0;
    setTimeout(() => {
      document.querySelector(".ant-modal-root").style.opacity = 1;
    }, 400);
  };
  const handleOk = async () => {
    await setConfirmLoading(true);
    setTimeout(() => {
      setMsgSent(true);
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
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
            <span>Message</span>
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
            <OrgPostRef
              title={title}
              content={postContent}
              postAuthor={postAuthor}
            />
            <textarea
              placeholder="Type a message..."
              onChange={handleTextChange}
            />
          </MsgModal>
          {msgRsp ? (
            <SuccessModal
              title="🎉 Your message was successfully sent"
              visible={msgSent}
              okText="View message"
              onCancel={handleDone}
              cancelText="Done"
            >
              <p>
                Your message to {postAuthor} concerning the "{title}" was sent
                succesfully.
              </p>
              <div className="modal-footer-container">
                <Link className="view-message-btn" to="/inbox">
                  View Message
                </Link>
              </div>
            </SuccessModal>
          ) : (
            <FailedModal
              title="🚧  Oops, something went wrong"
              visible={msgSent}
              onCancel={handleDone}
              cancelText="Close"
            >
              <p>
                Your message to {postAuthor} concerning the "{title}" was not
                sent succesfully. Please try again later.
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
