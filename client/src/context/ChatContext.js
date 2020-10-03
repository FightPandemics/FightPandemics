import React, { useState } from "react";
const ChatContext = React.createContext();

const ChatContextProvider = (props) => {
  const [chat, setChat] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [toggleMobileChatList, setToggleMobileChatList] = useState(true);
  return (
    <ChatContext.Provider
      value={{
        chat,
        setChat,
        empty,
        toggleMobileChatList,
        setToggleMobileChatList,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
