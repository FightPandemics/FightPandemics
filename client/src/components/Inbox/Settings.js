import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { CurrentChatContainer } from "./Container";
import { ChatContext } from "context/ChatContext";
import { SettingsHeader } from "./SettingsHeader";
import { Badge } from "antd";
import TextAvatar from "components/TextAvatar";
import { getInitialsFromFullName } from "utils/userInfo";
import { SideChatContainer } from "./Container";
import { theme, mq } from "constants/theme";
import Button from "components/Button/BaseButton";

const UserName = styled.h4`
  line-height: 2;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: -0.3em;
`;
const ThreadContainer = styled(SideChatContainer)`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    height: 12em;
  }
  header {
    h5 {
      position: relative;
      display: inline-block;
      color: gray;
      font-weight: 300;
      letter-spacing: 0.3px;
      line-height: 2.5;
      margin: 0 0.5rem;
    }
  }
  content {
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      position: absolute;
      top: initial;
    }
    .message {
      color: #cecece;
    }
  }
  &.for-blocked {
    height: 4em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        margin-bottom: 0;
    }
    content {
        top: initial;
        header h4 {
            margin-bottom: 0;
            max-width: 40%;
        }
    }
  }
`;
const ThreadsListContainer = styled.div`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-top: 5rem;
  }
`;
const StyledButton = styled(Button)`
  display: inline-block;
  position: relative;
  width: 17rem;
  right: 0;
  top: 0;
  border: 1px solid #425af2 !important;
  font-weight: 400;
  color: #425af2;
  padding: 0 2.5rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    position: relative;
    display: block;
    top: 5rem;
  }
  &.for-blocked {
    position: absolute;
    display: inline-block;
    top: -1rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      position: absolute!important;
      top: -0.2rem;
      right: 1rem;
    }
  }
`;
const NoThreads = styled.p`
  padding: 1rem;
  font-size: 1.5rem;
`
const Settings = ({ selectedSettingsTab, rooms, user }) => {
  const { toggleMobileChatList } = useContext(ChatContext);

  const getTabName = () => {
    switch (selectedSettingsTab) {
      case "BLOCKED":
        return "Blocked Accounts";
      case "ARCHIVED":
        return "Archived Conversations";
    }
  };

  const getReceiver = (participants) => {
    return participants.filter((p) => p.id != user.id)[0];
  };

  const getSender = (participants) => {
    return participants.filter((p) => p.id == user.id)[0];
  };

  const ArchivedConversations = ({ rooms }) => {
    return (
      <ThreadsListContainer>
        {rooms.filter(r=>getSender(r.participants).status == "archived").map((_room) => (
          <ThreadContainer>
            <Badge>
              <TextAvatar src={getReceiver(_room.participants).photo}>
                {getInitialsFromFullName(getReceiver(_room.participants).name)}
              </TextAvatar>
            </Badge>
            <content>
              <header>
                <UserName>{getReceiver(_room.participants).name}</UserName>
                <h5>
                  {_room.lastMessage
                    ? moment(_room.lastMessage.createdAt).format("MMM. DD")
                    : moment(_room.createdAt).format("MMM. DD")}
                </h5>
              </header>
              <div className="content">
                {<div className="title">{_room.topic}</div>}
                <p className="message">{_room.lastMessage?.content}</p>
              </div>
            </content>
            <StyledButton>Unarchive</StyledButton>
          </ThreadContainer>
        ))}
        {!rooms.filter(r=>getSender(r.participants).status == "archived").length && <NoThreads>You don't have any archived conversations.</NoThreads>}
      </ThreadsListContainer>
    );
  };

  const BlockedAccounts = ({ rooms }) => {
    return (
      <ThreadsListContainer>
        {rooms.filter(r=>getSender(r.participants).status == "blocked").map((_room) => (
          <ThreadContainer className={"for-blocked"}>
            <Badge>
              <TextAvatar src={getReceiver(_room.participants).photo}>
                {getInitialsFromFullName(getReceiver(_room.participants).name)}
              </TextAvatar>
            </Badge>
            <content>
              <header>
                <UserName>{getReceiver(_room.participants).name}</UserName>
              </header>
              <StyledButton className={"for-blocked"}>Unblock</StyledButton>
            </content>
          </ThreadContainer>
        ))}
        {!rooms.filter(r=>getSender(r.participants).status == "blocked").length && <NoThreads>You haven't blocked any accounts.</NoThreads>}
      </ThreadsListContainer>
    );
  };

  return (
    <CurrentChatContainer toggleMobileChatList={toggleMobileChatList}>
      <SettingsHeader tabName={getTabName()} />
      {selectedSettingsTab == "ARCHIVED" && <ArchivedConversations rooms={rooms}/>}
      {selectedSettingsTab == "BLOCKED" && <BlockedAccounts rooms={rooms} />}
    </CurrentChatContainer>
  );
};

export default Settings;
