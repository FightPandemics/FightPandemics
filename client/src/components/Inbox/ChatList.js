import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge } from 'antd';
import TextAvatar from "components/TextAvatar";
import { ChatHeader, ChatListContainer, SideChatContainer } from "./Container";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import moment from "moment";

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
  const dispatch = useDispatch()

  const getReceiver = (participants) => {
    return participants.filter(p=>p.id!=user.id)[0]
  }

  const getSender = (participants) => {
    return participants.filter(p=>p.id==user.id)[0]
  }

  useEffect(()=>{
    rooms.forEach(async _room => {
      if (_room.userStatus) return dispatch({type: "USER_STATUS_UPDATE", payload: { id: getReceiver(_room.participants).id, status: _room.userStatus} })
      let status = await getUserStatus(getReceiver(_room.participants).id)
      dispatch({type: "USER_STATUS_UPDATE", payload: { id: getReceiver(_room.participants).id, status: status} })
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
          <span className={`status-indicator ${_room.userStatus}`}></span>
        </Badge>
        <content>
          <header>
            <UserName>{getReceiver(_room.participants).name}</UserName>
            <h5>{_room.lastMessage? moment(_room.lastMessage.createdAt).format("MMM. DD") : moment(_room.createdAt).format("MMM. DD")}</h5>
            {getSender(_room.participants).newMessages > 0 && <span className="unread-indicator"></span>}
          </header>
          <div className="content">
            {<div className="title">{_room.topic}</div>}
            <p className="message">{_room.lastMessage?.content}</p>
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
