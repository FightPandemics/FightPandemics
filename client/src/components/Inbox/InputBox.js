import React, { useState } from "react";
import styled from "styled-components";
import sendcomment from "assets/icons/send-paper.svg";

const MessageInput = styled.input`
  min-width: 3em;
  width: 97%;
  height: 3.429em;
  border-radius: 8px;
  border: solid 1px #d7d7d7;
  padding: 1em;
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
      right: 2.5em;
      top: 25%;
      cursor: pointer;
    }
  }
`;

export const InputBox = () => {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <InputContainer text={text}>
      <MessageInput
        type="text"
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <a disabled={!text}>
        <img className="send-comment" src={sendcomment} alt="Send Comment" />
      </a>
    </InputContainer>
  );
};
