import React, { useState } from "react";
const ChatContext = React.createContext();

const ChatContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMobileChatList, setToggleMobileChatList] = useState(true);
  const [editingMessageId, setEditingMessageId] = useState(null);
  return (
    <ChatContext.Provider
      value={{
        isLoading,
        setIsLoading,
        editingMessageId,
        setEditingMessageId,
        toggleMobileChatList,
        setToggleMobileChatList,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
