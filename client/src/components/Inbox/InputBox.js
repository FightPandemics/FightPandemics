import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import sendcomment from "assets/icons/send-paper.svg";
import { theme, mq } from "constants/theme";

const MessageInput = styled.input`
  min-width: 3em;
  width: 97%;
  height: 3.429em;
  border-radius: 8px;
  border: solid 1px #d7d7d7;
  padding: 1em 5rem 1em 1em;
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
  a {
    opacity: ${(props) => (props.text ? "1" : "0.4")};
    img {
      position: absolute;
      right: 1.3em;
      top: 25%;
      cursor: pointer;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        right: 1.5em;
      }
    }
  }
`;

export const InputBox = ({ threadId, sendMessage }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = async (e) => {
    await setText(e.target.value);
  };

  const handleSendMgessage = async () => {
    let confirmation = await sendMessage({
      threadId: threadId,
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
    if (e.key === "Enter" && text.length > 0) {
      handleSendMgessage();
    }
  };
  return (
    <InputContainer text={text}>
      <MessageInput
        type="text"
        onChange={handleChange}
        placeholder="Type a message..."
        value={text}
        onKeyPress={handleKeyPress}
        ref={inputRef}
      />
      <a disabled={!text} onClick={handleClick}>
        <img className="send-comment" src={sendcomment} alt="Send Message" />
      </a>
    </InputContainer>
  );
};
