import React, { useEffect, useState } from "react";
import { Badge } from 'antd';
import TextAvatar from "components/TextAvatar";
import { ChatHeader, ChatListContainer, SideChatContainer } from "./Container";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import getRelativeTime from "utils/relativeTime";

const UserName = styled.h4`
  line-height: 2;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: -0.3em;
`;

export const ChatList = ({
  empty,
  toggleMobileChatList,
  setToggleMobileChatList,
  rooms,
  joinRoom,
  room,
  user,
  getUserStatus,
}) => {

  const [usersStatus, setUsersStatus] = useState({})

  const getReceiver = (participants) => {
    return participants.filter(p=>p.id!=user.id)[0]
  }

  const getSender = (participants) => {
    return participants.filter(p=>p.id==user.id)[0]
  }

  useEffect(()=>{
    rooms.forEach(async _room => {
      if (_room.userStatus) return setUsersStatus(prevState => {
        let newObj = Object.assign({}, prevState)
        newObj[_room._id] = _room.userStatus
        return newObj
      });
      let status = await getUserStatus(getReceiver(_room.participants).id)
      setUsersStatus(prevState => {
        let newObj = Object.assign({}, prevState)
        newObj[_room._id] = status
        return newObj
      });
    })
  }, [rooms])


  const SideChats = () => {

    return (
      <>
      {rooms.map((_room) => (
      <SideChatContainer
        className={`${ _room._id==room?._id ?'selected':''}`}
        key={_room._id}
        toggleMobileChatList={toggleMobileChatList}
        tabIndex="1"
        onClick={()=> {
          if (!room || room._id != _room._id) joinRoom({
            threadId: _room._id,
          })
        }
      }
      >
        <Badge>
          <TextAvatar src={getReceiver(_room.participants).photo}>
            {getInitialsFromFullName(getReceiver(_room.participants).name)}
          </TextAvatar>
          <span className={`status-indicator ${_room.userStatus || usersStatus[_room._id]}`}></span>
        </Badge>
        <content>
          <header>
            <UserName>{getReceiver(_room.participants).name}</UserName>
            <h5>{_room.lastMessage? getRelativeTime(_room.lastMessage.createdAt) : getRelativeTime(_room.createdAt)}</h5>
            {getSender(_room.participants).newMessages != 0 && <span className="unread-indicator">{getSender(_room.participants).newMessages}</span>}
          </header>
          <div className="content">
            {<div className="title">Topic....</div>}
            <p className="message">{_room.lastMessage?.content?.substring(0,20)}...</p>
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
        Messages <span>{rooms.map(_room=> getSender(_room.participants).newMessages?1:0).reduce((a,b)=>a+b,0)}</span>
      </ChatHeader>
      <div className="chat-bucket">
        {!empty && (
          <div onClick={() => setToggleMobileChatList(false)}>
            <SideChats/>
          </div>
        )}
      </div>
    </ChatListContainer>
  );
};
