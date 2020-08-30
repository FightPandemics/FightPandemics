import React, { useState } from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
const OrgPostRef = ({ title, content, postAuthor }) => {
  const Container = styled.div`
    h4 {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.2);
    }
    margin-bottom: 1em;
  `;

  const RefPost = styled.div`
    height: 106px;
    width: 592px;
    border-radius: 6px;
    padding: 1.3em 1em 1.3em 0em;
    header {
      .author {
        font-size: 12px;
        font-weight: 600;
        position: relative;
        bottom: 1em;
      }
      h3 {
        font-size: 16px;
        font-weight: 700;
      }
      .ant-avatar {
        height: 1.8em;
        line-height: 2.4rem;
        margin-right: 0.7rem;
        margin-left: 0.7rem;
        width: 1.8em;
        display: inline-block;
      }
    }
    .content {
      font-size: 14px;
    }
  `;
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

const MsgBtn = styled(Button)`
  color: white;
  margin-left: 20px;
`;

const MsgModal = styled(Modal)`
  .ant-modal-title {
    font-weight: 700;
    font-size: 1.2em;
  }
  .ant-modal-close-x {
    display: none;
  }
  .ant-modal-header {
    border-bottom: none;
    font-size: 18px;
    padding: 1em 0;
   }
  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
    border-top: none;
    bottom: 1em;
    width: 100%;
    border-radius: none;
    padding: 10px 5px;

    .ant-btn {
        box-shadow: none;
        height: 40px;
        width: 121px;
        font-size: 16px;
        letter-spacing: .5px;
        outline: none;
        :first-child {
        border: none;
        border-radius: none;
        background-color: white;
        color: #425af2;
        }
        :last-child {
        border: 0.2rem solid #425af2;
        border-radius: 4.6rem;
        background-color: #425af2;
        color: white;
    }
    }  
}
   }
  .ant-modal-body {
    padding: 0;
  }  
  .ant-modal-content {
    height: 435px;
    width: 656px;
    border-radius: 10px;
    padding: 1.5em 2em;
  }

  textarea {
    border: 1px solid lightgrey;
    border-radius: 6px;
    height: 136px;
    width: 592px;  
    margin: 0 0 1em 0;
    padding: 1em;
    resize: none;
    
    :focus {
        border: 1px solid #425af2;
    }
  }
`;

const SuccessModal = styled(MsgModal)`
  p {
    padding-top: 1em;
    width: 100%;
    font-size: 16px;
  }

  .ant-modal-title {
    text-align: center;
    padding-top: 1em;
    font-size: 22px;
  }
  .ant-modal-content {
    height: 287px;
    width: 656px;
    border-radius: 10px;
    padding: 1.5em 2em;
  }
  .ant-modal-footer > div {
    position: absolute;
    bottom: 30px;
  }
  .ant-btn:last-child {
    border: 0.2rem solid #425af2;
    border-radius: 4.6rem;
    background-color: #425af2;
    color: white;
    width: 198px;
  }
`;

const MessageModal = ({ title, postContent, postAuthor, isAuthenticated }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setVisible(false);
      setMsgSent(true);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDone = () => {
    setMsgSent(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <div>
          <div style={{ marginLeft: "3em" }} onClick={showModal}>
            Private Message
          </div>
          <MsgModal
            title="Send a message"
            visible={visible}
            onOk={handleOk}
            okText="Send"
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
          >
            <OrgPostRef
              title={title}
              content={postContent}
              postAuthor={postAuthor}
            />
            <textarea placeholder="Type a message..." maxLength="120" />
          </MsgModal>
          <SuccessModal
            title="🎉 Your message was successfully sent"
            visible={msgSent}
            // onOk={handleOk} This needs to send you to the main Private Message page
            okText="View message"
            onCancel={handleDone}
            cancelText="Done"
          >
            <p>
              Your message to {postAuthor} concerning the "{title}" was sent
              succesfully.
            </p>
          </SuccessModal>
        </div>
      ) : null}
    </>
  );
};

export default MessageModal;
