import React, { useContext } from "react";
import styled from "styled-components";
import arrow from "assets/icons/blue-down-arrow.svg";
import { theme, mq } from "constants/theme";
import TextAvatar from "components/TextAvatar";
import { ChatContext } from "context/ChatContext";

export const RecipientHeader = () => {
  const { setToggleMobileChatList } = useContext(ChatContext);
  const RecipientName = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(232, 232, 232, 0.7);
    height: 3.5em;
    overflow: auto;
    position: relative;
    top: 0px;
    display: flex;
    align-items: center;
    padding-left: 1em;
    .back-arrow {
      display: none;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: inline;
        transform: rotate(90deg);
        padding-top: 1em;
        cursor: pointer;
      }
    }
    .ant-avatar {
      width: 3.2rem;
      height: 3.2rem;
      line-height: 3.2rem;
      font-size: 0.929em;
    }
    h4 {
      position: relative;
      top: 0.2em;
      font-size: 1.071em;
      font-weight: 600;
    }
  `;

  return (
    <>
      <RecipientName>
        <img
          className="back-arrow"
          onClick={() => setToggleMobileChatList(true)}
          src={arrow}
          alt="Back Arrow"
        />
        <TextAvatar>LL</TextAvatar>
        <h4>Lily Luke</h4>
      </RecipientName>
    </>
  );
};
