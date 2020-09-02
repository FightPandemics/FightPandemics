import React, { useState } from "react";
import styled from "styled-components";
import TextAvatar from "components/TextAvatar";

const InboxContainer = styled.div`
  width: 93%;
  min-width: 57em;
  max-width: 96em;
  min-height: 37em;
  height: calc(100% - 12rem);
  position: absolute;
  background-color: white;
  display: flex;
`;
const ChatList = () => {
  const ChatListContainer = styled.div`
    position: relative;
    border-right: 1px solid rgba(232, 232, 232, 0.7);
    width: 25%;
    height: 100%;
    min-width: 22em;
    max-width: 24em;
  `;
  const ChatHeader = styled.div`
    border-bottom: 1px solid rgba(232, 232, 232, 0.7);
    padding: 1.6em 1.1em;
    font-size: 16px;
    font-weight: 700;
  `;
  const SideChats = () => {
    const SideChatContainer = styled.div`
      padding: 0.4em 1.1em;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      display: flex;
      height: 6em;
      align-items: center;
      cursor: pointer;
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
          font-size: 14px;
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
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#425AF2" />
              </svg>
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
      <ChatHeader>Messages</ChatHeader>
      <div style={{ overflow: "auto", height: "490px" }}>
        <SideChats />
        <SideChats />
        <SideChats />
      </div>
    </ChatListContainer>
  );
};

const CurrentChat = () => {
  const CurrentChatContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
  const RecipientHeader = () => {
    const Recipient = styled.div`
      width: 100%;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      height: 3.5em;
      position: relative;
      top: 0px;
      display: flex;
      align-items: center;
      padding-left: 1em;
      .ant-avatar {
        width: 3.2rem;
        height: 3.2rem;
        line-height: 3.2rem;
        font-size: 13px;
      }
      h4 {
        position: relative;
        top: 0.2em;
        font-size: 15px;
        font-weight: 600;
      }
    `;
    const OrignalPost = () => {
      const [showMessage, setShowMessage] = useState(false);
      const handleShowMessage = () => {
        setShowMessage(!showMessage);
      };
      const OrgPost = styled(Recipient)`
        height: ${(props) => (props.showMessage ? `200px` : "5.2em")};
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: ${(props) => (props.showMessage ? "visible" : "hidden")};
        padding: 1.5em;
        h3 {
          font-weight: 700;
          line-height: 1em;
        }
        div {
          display: flex;
        }
        p {
          margin-right: 1em;
        }
        svg {
          width: 150px;
          cursor: pointer;
        }
      `;

      const ToggleShowMessage = () => {
        const ToggleContainer = styled.div`
          position: absolute;
          right: -4em;
        `;
        return (
          <ToggleContainer onClick={handleShowMessage}>
            {!showMessage ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8L12 15L5 8"
                  stroke="#425AF2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16L12 9L19 16"
                  stroke="#425AF2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </ToggleContainer>
        );
      };
      return (
        <OrgPost showMessage={showMessage}>
          <h3>Offering disinfecting clorox wipes</h3>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ToggleShowMessage />
          </div>
        </OrgPost>
      );
    };

    return (
      <>
        <Recipient>
          <TextAvatar>LL</TextAvatar>
          <h4>Lily Luke</h4>
        </Recipient>
        <OrignalPost />
      </>
    );
  };

  const InputBox = () => {
    const InputContainer = styled.div`
      display: flex;
      justify-content: center;
      height: 48px;
      width: 100%;
      position: absolute;
      bottom: 1em;
      :focus {
      }
      svg {
        position: absolute;
        right: 2.5em;
        top: 25%;
      }
    `;
    const MessageInput = styled.input`
      min-width: 3em;
      width: 97%;
      height: 48px;
      border-radius: 8px;
      border: solid 1px #d7d7d7;
      padding: 1em;
      ::placeholder {
        opacity: 0.7;
        letter-spacing: 0.8px;
      }
    `;
    const SendSvg = () => {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            fill="#425AF2"
            stroke="#425AF2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 6L10 14"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    };
    return (
      <InputContainer>
        <MessageInput placeholder="Type a message..." />
        <SendSvg />
      </InputContainer>
    );
  };

  const Messages = () => {
    const BubbleContainer = styled.div`
      display: flex;
      justify-content: flex-end;
    `;
    const MessagesContainer = styled.div`
      position: relative;
      width: 100%;
      height: 80%;
      min-height: 40%;
      padding: 1em;
      display: flex;
      flex-direction: column;
      overflow: auto;
      margin-bottom: 6em;
    `;
    const Sender = () => {
      const SenderBubble = styled.div`
        max-width: 75%;
        background-color: #425af2;
        padding: 0.8em;
        border-radius: 1em 1em 0em 1em;
        letter-spacing: 1px;
        margin-top: 1em;
        word-wrap: break-word;
        color: #fff;
      `;
      //style={{display:"flex", justifyContent: "flex-end"}}
      return (
        <BubbleContainer>
          <SenderBubble>
            Hasdf ;lkjasdfasdlkfj asdfasdfa asdfasdfasdf asdf;lkajdf alkj
            asdf;laksjdf asdf;lakj asd;lfkj Hasdf ;lkjasdfasdlkfj asdfasdfa
            asdfasdfasdf asdf;lkajdf alkj asdf;laksjdf asdf;lakj asd;lfkj Hasdf
            ;lkjasdfasdlkfj asdfasdfa asdfasdfasdf asdf;lkajdf alkj asdf;laksjdf
            asdf;lakj asd;lfkj
          </SenderBubble>
        </BubbleContainer>
      );
    };
    const Recipient = () => {
      const RecipientBubble = styled.div`
        width: 75%;
        background-color: #f6f7fb;
        padding: 0.8em;
        border-radius: 0em 1em 1em 1em;
        letter-spacing: 1px;
        margin-top: 1em;
        word-wrap: break-word;
      `;
      return (
        <RecipientBubble>
          Hi Lily, I have 2 packs of disinfecting wipes and can give them to you
          for free.Hi Lily, I have 2 packs of disinfecting wipes and can give
          them to you for free. Hi Lily, I have 2 packs of disinfecting wipes
          and can give them to you for free.
        </RecipientBubble>
      );
    };
    return (
      <MessagesContainer>
        <Recipient />
        <Sender />
        <Recipient />
        <Sender />
      </MessagesContainer>
    );
  };

  return (
    <CurrentChatContainer>
      <RecipientHeader />
      <Messages />
      <InputBox />
    </CurrentChatContainer>
  );
};

const Inbox = () => {
  return (
    <InboxContainer>
      <ChatList />
      <CurrentChat />
    </InboxContainer>
  );
};

export default Inbox;
