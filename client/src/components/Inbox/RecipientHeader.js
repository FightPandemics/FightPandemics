import React, { useContext } from "react";
import { Badge, Menu, Dropdown, Typography } from "antd";
import { Modal } from "antd-mobile";
import styled from "styled-components";
import arrow from "assets/icons/blue-down-arrow.svg";
import subMenuIcon from "assets/icons/submenu.svg";
import { theme, mq } from "constants/theme";
import TextAvatar from "components/TextAvatar";
import { ChatContext } from "context/ChatContext";
import { getInitialsFromFullName } from "utils/userInfo";
import getRelativeTime from "utils/relativeTime";
const { Text } = Typography;

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
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    background-color: #ffffff;
    position: absolute;
    top: 0;
    z-index: 3;
  }
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
  .status-indicator {
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
const ThreadMenu = styled.img`
  opacity: 0.5;
  position: absolute;
  right: 0;
  width: 4.5rem;
  height: 4.5rem;
  cursor: pointer;
  padding: 1rem;
  background: #f6f7fb;
  border-radius: 100%;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    right: 1rem;
  }
`;
export const RecipientHeader = ({
  threadId,
  participant,
  onMobileBackClick,
  status,
  blockThread,
  unblockThread,
  archiveThread,
  blockStatus,
}) => {
  const { setToggleMobileChatList } = useContext(ChatContext);

  function showBlockConfirm() {
    Modal.alert(
      `Block the connversation from ${participant.name}?`,
      `By selecting "Block", ${participant.name} won't be able to send you a message or message request. You can go to Message Settings to manage blocked accounts.`,
      [
        {
          text: <Text type="danger">Block</Text>,
          onPress: () => blockThread(threadId),
        },
        { text: "Cancel", onPress: () => null },
      ],
    );
  }

  function showArchiveConfirm() {
    Modal.alert(
      "Archive the conversation?",
      "If you'd like to read the conversation again, you'll have to go to Messages Settings to restore it.",
      [
        {
          text: <Text type="danger">Archive</Text>,
          onPress: () => {
            archiveThread(threadId);
            setToggleMobileChatList(true);
          },
        },
        { text: "Cancel", onPress: () => null },
      ],
    );
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={() => showArchiveConfirm()}>Archive</Menu.Item>
      {!blockStatus && (
        <Menu.Item onClick={() => showBlockConfirm()} danger>
          Block
        </Menu.Item>
      )}
    </Menu>
  );

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
          <h4>
            {participant.name}
            <LastSeen>
              {status == "online" ? (
                "Active Now"
              ) : (
                <>
                  Last seen:{" "}
                  {participant.lastAccess
                    ? getRelativeTime(participant.lastAccess)
                    : "never"}
                </>
              )}
            </LastSeen>
          </h4>
          {(!blockStatus || blockStatus == "was-blocked") && (
            <Dropdown overlay={menu} placement="bottomRight">
              <ThreadMenu src={subMenuIcon} />
            </Dropdown>
          )}
        </RecipientName>
      )}
    </>
  );
};
