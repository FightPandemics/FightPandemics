import React from "react";
import styled from "styled-components";
import TextArea from "./TextArea";
import SvgIcon from "components/Icon/SvgIcon";
import send from "assets/icons/send.svg";
import { Button } from "antd";

const SendButton = styled(Button)`
  align-items: center;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  float: right;
  height: 4.5rem;
  justify-content: center;


`;

const AutoSize = ({ placeholder, value, onChange, onPressEnter }) => {
  return (
    <div style={{margin: "auto"}}>
    <TextArea
      autoSize
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
      placeholder={placeholder}
    />
    <SendButton onClick={onPressEnter}>
      <SvgIcon src={send} />
    </SendButton>
    {/* <button onClick={onPressEnter}>Send</button> */}
    </div>
  );
};

export default AutoSize;
