import React from "react";
import { Badge } from "antd";
import TextAvatar from "components/TextAvatar";
import { ChatHeader, ChatListContainer, SideChatContainer } from "./Container";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import moment from "moment";
import gearIcon from "assets/icons/settings-blue.svg";
import arrow from "assets/icons/blue-down-arrow.svg";

const UserName = styled.h4`
  line-height: 2;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: -0.3em;
`;
const SettingsIcon = styled.img`
  position: absolute;
  width: 2.1rem;
  right: 1.5rem;
  cursor: pointer;
`;
const SettingsBackArrow = styled.img`
  transform: rotate(90deg);
  padding-top: 1em;
  cursor: pointer;
`;
const SettingsNextArrow = styled.img`
  transform: rotate(-90deg);
  padding-top: 1em;
  cursor: pointer;
  position: absolute;
  right: 1rem;
`;
const SettingsTabsSelector = styled(SideChatContainer)`
  padding: 0.4em;
  height: 4em;
`;

export const ChatList = ({
  empty,
  toggleMobileChatList,
  setToggleMobileChatList,
  rooms,
  joinRoom,
  room,
  user,
  isSettingsOpen,
  toggleSettings,
  setSettingsTab,
  selectedSettingsTab,
}) => {
  const getReceiver = (participants) => {
    return participants.filter((p) => p.id != user.id)[0];
  };

  const getSender = (participants) => {
    return participants.filter((p) => p.id == user.id)[0];
  };

  const SideChats = () => {
    return (
      <>
        {rooms.map((_room) => (
          <SideChatContainer
            className={`${_room._id == room?._id ? "selected" : ""}`}
            key={_room._id}
            toggleMobileChatList={toggleMobileChatList}
            tabIndex="1"
            onClick={() => {
              if (!room || room._id != _room._id)
                joinRoom({
                  threadId: _room._id,
                });
            }}
          >
            <Badge>
              <TextAvatar src={getReceiver(_room.participants).photo}>
                {getInitialsFromFullName(getReceiver(_room.participants).name)}
              </TextAvatar>
              <span className={`status-indicator ${_room.userStatus}`}></span>
            </Badge>
            <content>
              <header>
                <UserName>{getReceiver(_room.participants).name}</UserName>
                <h5>
                  {_room.lastMessage
                    ? moment(_room.lastMessage.createdAt).format("MMM. DD")
                    : moment(_room.createdAt).format("MMM. DD")}
                </h5>
                {getSender(_room.participants).newMessages > 0 && (
                  <span className="unread-indicator"></span>
                )}
              </header>
              <div className="content">
                {<div className="title">{_room.topic}</div>}
                <p className="message">{_room.lastMessage?.content}</p>
              </div>
            </content>
          </SideChatContainer>
        ))}
      </>
    );
  };

  const SettingsSelector = () => {
    return (
      <>
        <ChatHeader>
          <SettingsBackArrow
            onClick={() => {
              toggleSettings();
            }}
            src={arrow}
            alt="Back Arrow"
          />{" "}
          Messages Settings
        </ChatHeader>
        <div onClick={() => setToggleMobileChatList(false)}>
          <SettingsTabsSelector
            className={`${selectedSettingsTab == "BLOCKED" ? "selected" : ""}`}
            onClick={() => setSettingsTab("BLOCKED")}
          >
            Blocked Accounts
            <SettingsNextArrow
              src={arrow}
              alt="next Arrow"
            />
          </SettingsTabsSelector>
          <SettingsTabsSelector
            className={`${selectedSettingsTab == "ARCHIVED" ? "selected" : ""}`}
            onClick={() => setSettingsTab("ARCHIVED")}
          >
            Archived Conversations
            <SettingsNextArrow
              src={arrow}
              alt="next Arrow"
            />
          </SettingsTabsSelector>
        </div>
      </>
    );
  };

  return (
    <ChatListContainer
      toggleMobileChatList={toggleMobileChatList}
    >
      {!isSettingsOpen ? (
        <>
          <ChatHeader>
            Messages{" "}
            <span>
              {rooms
                .map((_room) =>
                  getSender(_room.participants).newMessages ? 1 : 0,
                )
                .reduce((a, b) => a + b, 0)}
            </span>
            <SettingsIcon onClick={() => toggleSettings()} src={gearIcon} />
          </ChatHeader>
          <div className="chat-bucket">
            {!empty && (
              <div onClick={() => setToggleMobileChatList(false)}>
                <SideChats />
              </div>
            )}
          </div>
        </>
      ) : (
        <SettingsSelector />
      )}
    </ChatListContainer>
  );
};
