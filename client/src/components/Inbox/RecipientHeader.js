import React, { useContext } from "react";
import { Badge } from "antd";
import styled from "styled-components";
import arrow from "assets/icons/blue-down-arrow.svg";
import { theme, mq } from "constants/theme";
import TextAvatar from "components/TextAvatar";
import { ChatContext } from "context/ChatContext";
import { getInitialsFromFullName } from "utils/userInfo";
import getRelativeTime from "utils/relativeTime";

const RecipientName = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  height: 3.5em;
  overflow: auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-wrap: wrap;
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
  .status-indicator{
    position: absolute;
    left: 2.1rem;
    margin-top: -1.1rem;
    background: #cecece;
    border-radius: 100%;
    height: 1.2rem;
    width: 1.2rem;
    border: 2px solid #fff;
    &.online {
      background: lightgreen;
    }
  }
  h4 {
    position: relative;
    top: 0.2em;
    font-size: 1.071em;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50%;
    line-height: 1.1;
  }
`;
const LastSeen = styled.small`
  display: block;
  font-weight: 400;
  line-height: 1.2;
  color: #969292;
`;
export const RecipientHeader = ({ participant, onMobileBackClick, status }) => {
  const { setToggleMobileChatList } = useContext(ChatContext);
  return (
    <>
      {participant && (
        <RecipientName>
          <img
            className="back-arrow"
            onClick={() => {
              setToggleMobileChatList(true);
              onMobileBackClick();
            }}
            src={arrow}
            alt="Back Arrow"
          />
          <Badge>
            <TextAvatar src={participant.photo}>
              {getInitialsFromFullName(participant.name)}
            </TextAvatar>
            <span className={`status-indicator ${status}`}></span>
          </Badge>
          <h4>{participant.name}
          <LastSeen>
            {status == "online" ? "Active Now" :
            <>
            Last seen:{" "}
            {participant.lastAccess
              ? getRelativeTime(participant.lastAccess)
              : "never"}
            </>
            }
          </LastSeen></h4>
        </RecipientName>
      )}
    </>
  );
};
