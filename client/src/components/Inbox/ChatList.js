import React from "react";
import isonline from "assets/icons/is-online-dot.svg";
import TextAvatar from "components/TextAvatar";
import { ChatHeader, ChatListContainer, SideChatContainer } from "./Container";

export const ChatList = ({
  empty,
  toggleMobileChatList,
  setToggleMobileChatList,
}) => {
  const SideChats = () => {
    return (
      <SideChatContainer
        toggleMobileChatList={toggleMobileChatList}
        tabIndex="1"
      >
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
    <ChatListContainer toggleMobileChatList={toggleMobileChatList}>
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
