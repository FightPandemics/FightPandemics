import React from "react";
import styled from "styled-components";
import isonline from "assets/icons/is-online-dot.svg";
import TextAvatar from "components/TextAvatar";
import { theme, mq } from "constants/theme";
import { ChatHeader } from "./Container";
export const ChatList = ({
  empty,
  toggleMobileChatList,
  setToggleMobileChatList,
}) => {
  const ChatListContainer = styled.div`
    position: relative;
    border-right: 1px solid rgba(232, 232, 232, 0.7);
    width: 25%;
    height: 100%;
    min-width: 22em;
    max-width: 24em;
    .chat-bucket {
      overflow: auto;
      height: 35em;
    }
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: ${toggleMobileChatList ? "block" : "none"};
      width: ${toggleMobileChatList ? "100%" : "25%"};
      max-width: ${toggleMobileChatList ? "100vw" : "22em"};
    }
  `;
  const SideChats = () => {
    const SideChatContainer = styled.div`
      padding: 0.4em 1.1em;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      display: flex;
      height: 6em;
      align-items: center;
      cursor: pointer;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        justify-content: ${toggleMobileChatList ? "center" : null};
      }
      :hover {
        background: #f3f4fe;
      }
      :focus {
        border-left: 3px solid #425af2;
        background: #f3f4fe;
      }
      .ant-avatar {
        width: 3.8rem;
        height: 3.8rem;
        line-height: 3.8rem;
      }
      header {
        display: flex;
        line-height: 0.4;
        span {
          position: relative;
          right: 3.8em;
        }
        h4 {
          position: relative;
          right: 0.6em;
          font-weight: 600;
        }
        h5 {
          position: relative;
          left: 11em;
          top: 0.1em;
          color: gray;
          font-weight: 300;
          letter-spacing: 0.3px;
        }
      }
      content {
        position: relative;
        top: 0.9em;
        line-height: 1.5;
        .title {
          font-size: 1em;
          font-weight: 500;
        }
        .message {
          opacity: 0.7;
          letter-spacing: 0.4px;
        }
      }
    `;
    return (
      <SideChatContainer tabIndex="1">
        <TextAvatar>LL</TextAvatar>
        <content>
          <header>
            <span>
              <img
                className="is-online-dot"
                src={isonline}
                alt="Is Online Dot"
              />
            </span>
            <h4>Lily Luke</h4>
            <h5>Aug 22</h5>
          </header>
          <div className="content">
            <div className="title">Offering disinfecting clorox...</div>
            <p className="message">Let me know if you still need...</p>
          </div>
        </content>
      </SideChatContainer>
    );
  };

  return (
    <ChatListContainer>
      <ChatHeader>
        Messages <span>1</span>
      </ChatHeader>
      <div className="chat-bucket">
        {!empty && (
          <div onClick={() => setToggleMobileChatList(false)}>
            <SideChats />
          </div>
        )}
      </div>
    </ChatListContainer>
  );
};
