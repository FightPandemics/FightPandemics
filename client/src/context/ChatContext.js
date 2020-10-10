import React, { useState } from "react";
const ChatContext = React.createContext();

const ChatContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMobileChatList, setToggleMobileChatList] = useState(true);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [inputExpanded, setInputExpanded] = useState(false);
  return (
    <ChatContext.Provider
      value={{
        isLoading,
        setIsLoading,
        editingMessageId,
        setEditingMessageId,
        toggleMobileChatList,
        setToggleMobileChatList,
        inputExpanded,
        setInputExpanded,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
