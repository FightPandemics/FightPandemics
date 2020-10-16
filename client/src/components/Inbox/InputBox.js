import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import sendcomment from "assets/icons/send-paper.svg";
import { theme, mq } from "constants/theme";

const MessageInput = styled.textarea`
  min-width: 3em;
  width: 97%;
  height: 3.429em;
  border-radius: 8px;
  border: solid 1px #d7d7d7;
  padding: 1em 5rem 1em 1em;
  resize: none;
  ::placeholder {
    opacity: 0.7;
    letter-spacing: 0.8px;
  }
  :focus {
    border: 1px solid rgba(66, 90, 242, 0.5);
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 3.429em;
  width: 100%;
  position: absolute;
  bottom: 1em;
  &.expanded {
    height: 6.858em;
    textarea {
      height: 6em;
    }
  }
  a {
    opacity: ${(props) => (props.text ? "1" : "0.4")};
    img {
      position: absolute;
      right: 2em;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        right: 1.5em;
      }
    }
  }
`;
const ChatDisabled = styled.p`
  width: 100%;
  padding: 1rem;
  background: #fff;
  .unblock-btn {
    display: block;
    border: 1px solid #425af2 !important;
    font-weight: 500;
    color: #425af2;
    padding: 1rem 2.5rem;
    background: #fff;
    border-radius: 2rem;
    font-size: 1.5rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  .request-btns {
    display: inline;
    border: 1px solid #425af2 !important;
    font-weight: 500;
    color: #425af2;
    padding: 1rem 2.5rem;
    background: #fff;
    border-radius: 2rem;
    font-size: 1.5rem;
    cursor: pointer;
    margin: 0.5rem;
    &.ingore-btn {
      color: red;
      border: 1px solid red !important;
    }
    &.block-btn {
      float: right;
      color: black;
      border: 1px solid black !important;
    }
  }
`;
export const InputBox = ({
  user,
  room,
  sendMessage,
  inputExpanded,
  setInputExpanded,
  blockStatus,
  leaveAllRooms,
  unblockThread,
  blockThread,
  archiveThread,
  setToggleViewRequests,
}) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const getReceiver = (participants) => {
    return participants.filter((p) => p.id != user.id)[0];
  };

  const getSender = (participants) => {
    return participants.filter((p) => p.id == user.id)[0];
  };

  useEffect(() => {
    if (
      inputRef.current &&
      window.screen.width >= parseInt(mq.phone.wide.maxWidth)
    )
      inputRef.current.focus();
  }, []);

  const handleChange = async (e) => {
    await setText(e.target.value);
  };

  useEffect(() => {
    if (!inputRef.current || (inputExpanded && text)) return;
    if (inputRef.current.clientHeight < inputRef.current.scrollHeight)
      return setInputExpanded(true);
    if ((text.match(/\n/g) || []).length) setInputExpanded(true);
    else setInputExpanded(false);
  }, [inputExpanded, setInputExpanded, text]);

  const handleSendMgessage = async () => {
    let confirmation = await sendMessage({
      threadId: room._id,
      content: text,
    });
    if (confirmation) {
      setText("");
      inputRef.current.focus();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    handleSendMgessage();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) e.preventDefault();
    if (e.key === "Enter" && !e.shiftKey && text.length > 0) {
      handleSendMgessage();
    }
  };
  return (
    <InputContainer
      className={`${inputExpanded || blockStatus ? "expanded" : ""}`}
      text={text}
    >
      {blockStatus == "did-block" && (
        <ChatDisabled>
          You've bocked {getReceiver(room.participants).name}. unblock to
          receive messages from them again.
          <button
            className={"unblock-btn"}
            onClick={() => unblockThread(room._id)}
          >
            Unblock
          </button>
        </ChatDisabled>
      )}
      {blockStatus == "was-blocked" && (
        <ChatDisabled>
          You've been bocked by {getReceiver(room.participants).name}. you can
          no longer message them.
        </ChatDisabled>
      )}
      {!blockStatus && getSender(room.participants).status == "pending" && (
        <ChatDisabled>
          Do want to accept the message request?. you cannot reply until you
          accept the request.
          <div>
            <button
              className={"request-btns accept-btn"}
              onClick={() => {
                unblockThread(
                  room._id,
                ); /* even if not blocked, it will mark it as "accepted" */
                setToggleViewRequests(false);
              }}
            >
              Accept
            </button>
            <button
              className={"request-btns ingore-btn"}
              onClick={() => archiveThread(room._id)}
            >
              ignore
            </button>
            <button
              className={"request-btns block-btn"}
              onClick={async () => {
                await blockThread(room._id);
                leaveAllRooms();
              }}
            >
              Block
            </button>
          </div>
        </ChatDisabled>
      )}
      {!blockStatus && getSender(room.participants).status == "accepted" && (
        <>
          <MessageInput
            type="text"
            onChange={handleChange}
            placeholder="Type a message..."
            value={text}
            onKeyPress={handleKeyPress}
            ref={inputRef}
            maxLength={2000}
          />
          <a disabled={!text} onClick={handleClick}>
            <img
              className="send-comment"
              src={sendcomment}
              alt="Send Message"
            />
          </a>
        </>
      )}
    </InputContainer>
  );
};
