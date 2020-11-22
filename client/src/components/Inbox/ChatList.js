import React from "react";
import { Badge } from "antd";
import TextAvatar from "components/TextAvatar";
import { ChatHeader, ChatListContainer, SideChatContainer } from "./Container";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import moment from "moment";
import gearIcon from "assets/icons/settings-blue.svg";
import arrow from "assets/icons/blue-down-arrow.svg";
import { useTranslation } from "react-i18next";
import { mq } from "constants/theme";
import GTM from "constants/gtm-tags";
import { EmptyInbox } from "components/Inbox/EmptyInbox";

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
  height: 5.6rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 100vw;
  }
`;

export const ChatList = ({
  toggleMobileChatList,
  setToggleMobileChatList,
  rooms,
  joinRoom,
  room,
  user,
  leaveAllRooms,
  isSettingsOpen,
  toggleSettings,
  setSettingsTab,
  selectedSettingsTab,
  toggleViewRequests,
  setToggleViewRequests,
  acceptedRooms,
  pendingRooms,
}) => {
  const { t } = useTranslation();

  const getReceiver = (participants) => {
    return participants.filter((p) => p.id !== (user._id || user.id))[0];
  };

  const getSender = (participants) => {
    return participants.filter((p) => p.id === (user._id || user.id))[0];
  };

  const SideChats = () => {
    let roomsToShow = toggleViewRequests ? pendingRooms : acceptedRooms;
    return (
      <>
        {roomsToShow.map((_room) => {
          const receiver = getReceiver(_room.participants)
          return (
          <SideChatContainer
            className={`${_room._id === room?._id ? "selected" : ""}`}
            key={_room._id}
            toggleMobileChatList={toggleMobileChatList}
            tabIndex="1"
            onClick={() => {
              if (!room || room._id !== _room._id)
                joinRoom({
                  threadId: _room._id,
                });
            }}
          >
            <Badge>
              <TextAvatar src={receiver.photo}>
                {getInitialsFromFullName(receiver.name)}
              </TextAvatar>
              <span className={`status-indicator ${_room.userStatus}`}></span>
            </Badge>
            <content>
              <header>
                <UserName>{receiver.name}</UserName>
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
        )})}
        {!roomsToShow.length && <EmptyInbox mobile />}
      </>
    );
  };

  const SettingsSelector = () => {
    return (
      <>
        <ChatHeader
          onClick={() => {
            toggleSettings();
          }}
          style={{ cursor: "pointer" }}
        >
          <SettingsBackArrow src={arrow} alt="Back Arrow" />{" "}
          {t("messaging.settings.header")}
        </ChatHeader>
        <div
          onClick={() => {
            setToggleMobileChatList(false);
          }}
        >
          <SettingsTabsSelector
            className={`${selectedSettingsTab === "BLOCKED" ? "selected" : ""}`}
            onClick={() => setSettingsTab("BLOCKED")}
          >
            {t("messaging.settings.blocked")}
            <SettingsNextArrow src={arrow} alt="next Arrow" />
          </SettingsTabsSelector>
          <SettingsTabsSelector
            className={`${
              selectedSettingsTab === "ARCHIVED" ? "selected" : ""
            }`}
            onClick={() => setSettingsTab("ARCHIVED")}
          >
            {t("messaging.settings.archived")}
            <SettingsNextArrow src={arrow} alt="next Arrow" />
          </SettingsTabsSelector>
        </div>
      </>
    );
  };

  const unreadCount = acceptedRooms
    .map((_room) => (getSender(_room.participants).newMessages ? 1 : 0))
    .reduce((a, b) => a + b, 0);

  return (
    <ChatListContainer
      toggleMobileChatList={toggleMobileChatList && !room?._id}
    >
      {!isSettingsOpen ? (
        <>
          {!toggleViewRequests && (
            <ChatHeader>
              {t("messaging.header")}{" "}
              {unreadCount > 0 && <span>{unreadCount}</span>}
              <SettingsIcon onClick={() => toggleSettings()} src={gearIcon} />
            </ChatHeader>
          )}
          {(pendingRooms.length > 0 || toggleViewRequests) && (
            <ChatHeader
              type="subHeader"
              style={toggleViewRequests ? { fontWeight: "bold" } : {}}
              onClick={() => {
                leaveAllRooms();
                setToggleViewRequests(!toggleViewRequests);
              }}
              id={
                !toggleViewRequests
                  ? GTM.inbox.prefix + GTM.inbox.request + GTM.inbox.view
                  : ""
              }
            >
              {toggleViewRequests && (
                <SettingsBackArrow
                  src={arrow}
                  style={{ transform: "rotate(90deg)" }}
                />
              )}
              {t("messaging.requests")} <span>{pendingRooms.length}</span>
              {!toggleViewRequests && (
                <SettingsIcon
                  src={arrow}
                  style={{ transform: "rotate(-90deg)" }}
                />
              )}
            </ChatHeader>
          )}
          <div className="chat-bucket">
            <div
              onClick={() => {
                setToggleMobileChatList(false);
              }}
            >
              <SideChats />
            </div>
          </div>
        </>
      ) : (
        <SettingsSelector />
      )}
    </ChatListContainer>
  );
};
