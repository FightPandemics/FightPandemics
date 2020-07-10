import React from "react";
import styled from "styled-components";
import TextArea from "./TextArea";
import SvgIcon from "components/Icon/SvgIcon";
import send from "assets/icons/send.svg";
import { Button } from "antd";
import { mq, theme } from "constants/theme";
const { white } = theme.colors;

const SendButton = styled(Button)`
  align-items: center;
  border: none;
  color: ${white};
  cursor: pointer;
  display: flex;
  float: right;
  height: 4.5rem;
  justify-content: center;

  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    height: 5rem;
    padding: .5rem .5rem;
  }
`;

const AutoSize = ({
  placeholder,
  value,
  onChange,
  onPressEnter,
  gtmTag = "",
}) => {
  return (
    <>
      <TextArea
        id={gtmTag}
        autoSize
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
        placeholder={placeholder}
      />
      <SendButton onClick={onPressEnter}>
        <SvgIcon src={send} />
      </SendButton>
    </>
  );
};

export default AutoSize;
