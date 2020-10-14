import React, { useState } from "react";
const ChatContext = React.createContext();

const ChatContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMobileChatList, setToggleMobileChatList] = useState(true);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [inputExpanded, setInputExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedSettingsTab, setSettingsTab] = useState(null);
  const [toggleViewRequests, setToggleViewRequests] = useState(false);
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
        isSettingsOpen,
        setIsSettingsOpen,
        setSettingsTab,
        selectedSettingsTab,
        toggleViewRequests,
        setToggleViewRequests,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
