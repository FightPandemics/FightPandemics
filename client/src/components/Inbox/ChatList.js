import React, { useEffect } from "react";
import isonline from "assets/icons/is-online-dot.svg";
import TextAvatar from "components/TextAvatar";
import { ChatHeader, ChatListContainer, SideChatContainer } from "./Container";

export const ChatList = ({
  empty,
  toggleMobileChatList,
  setToggleMobileChatList,
  rooms,
  joinRoom,
  room,
  user
}) => {
  const SideChats = () => {

    const getReceiverName = (participants) => {
      return participants.filter(p=>p.id!=user.id)[0].name
    }
    const getReceiverId = (participants) => {
      return participants.filter(p=>p.id!=user.id)[0].id
    }
    return (
      <>
      {rooms.map((_room) => (
      <SideChatContainer
        className={`${ _room._id==room?._id ?'selected':''}`}
        key={_room._id}
        toggleMobileChatList={toggleMobileChatList}
        tabIndex="1"
        onClick={()=>joinRoom({
          receiverId: getReceiverId(_room.participants),
        })}
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
            <h4>{getReceiverName(_room.participants)}</h4>
            <h5>Aug 22</h5>
          </header>
          <div className="content">
            <div className="title">Topic....</div>
            <p className="message">LastMessage....</p>
          </div>
        </content>
      </SideChatContainer>)
      )}
      </>

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
