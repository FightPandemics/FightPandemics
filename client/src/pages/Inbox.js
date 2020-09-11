import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextAvatar from "components/TextAvatar";
import Button from "components/Button/SubmitButton";
import { theme, mq } from "constants/theme";
import emptyinbox from "assets/empty-inbox.svg";
import arrow from "assets/icons/blue-down-arrow.svg";
import isonline from "assets/icons/is-online-dot.svg";
import { InboxContainer, ChatHeader } from "../components/Inbox/Container";
import { InputBox } from "../components/Inbox/InputBox";

const ChatList = ({ empty, toggleMobileChatList, setToggleMobileChatList }) => {
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

const CurrentChat = ({ toggleMobileChatList, setToggleMobileChatList }) => {
  const CurrentChatContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: ${toggleMobileChatList ? "none" : "flex"};
    }
  `;
  const RecipientHeader = () => {
    const RecipientName = styled.div`
      width: 100%;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      height: 3.5em;
      overflow: auto;
      position: relative;
      top: 0px;
      display: flex;
      align-items: center;
      padding-left: 1em;
      .back-arrow {
        display: none;
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          display: inline;
          transform: rotate(90deg);
          padding-top: 1em;
          cursor: pointer;
        }
      }
      .ant-avatar {
        width: 3.2rem;
        height: 3.2rem;
        line-height: 3.2rem;
        font-size: 0.929em;
      }
      h4 {
        position: relative;
        top: 0.2em;
        font-size: 1.071em;
        font-weight: 600;
      }
    `;

    return (
      <>
        <RecipientName>
          <img
            className="back-arrow"
            onClick={() => setToggleMobileChatList(true)}
            src={arrow}
            alt="Back Arrow"
          />
          <TextAvatar>LL</TextAvatar>
          <h4>Lily Luke</h4>
        </RecipientName>
      </>
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
      padding: 0em 1em 1em 1em;
      display: flex;
      flex-direction: column;
      overflow: auto;
      margin-bottom: 6em;
    `;
    const Sender = (props) => {
      const SenderBubble = styled.div`
        width: 60%;
        background-color: #425af2;
        padding: 0.8em 0.1em 0.8em 0.1em;
        border-radius: 1em 1em 0.1em 1em;
        letter-spacing: 1px;
        margin-top: 1em;
        word-wrap: break-word;
        color: #fff;
        .message-content {
          margin: 0em 1em 0em 1em;
        }
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          width: 70%;
        }
      `;
      const OrgPost = styled.div`
        display: ${(props) => (props.fromPost ? "block" : "none")};
        padding: 0.8em;
        background: #ffff;
        border-radius: 1em 1em 0em 0em;
        color: #282828;
        margin-bottom: 1em;
        header {
          display: flex;
          font-size: 0.9em;
          height: 2em;
          .post-type {
            margin-right: 0.5em;
            font-weight: 500;
          }
          span {
            font-size: 2em;
            position: relative;
            bottom: 0.7em;
          }
          .post-date {
            margin-left: 0.5em;
            opacity: 0.5;
          }
        }
        .post-title {
          font-size: 1.3em;
          font-weight: 700;
          margin: 0em 0em 0.2em 0em;
          @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
            margin: 0.2em 0em 0.2em 0em;
          }
        }
        .post-content {
          letter-spacing: 1.3px;
        }
      `;
      return (
        <BubbleContainer>
          <SenderBubble>
            <OrgPost fromPost={props.fromPost}>
              <header>
                <div className="post-type">Offers</div>
                <span>.</span>
                <div className="post-date">Posted 14hrs ago</div>
              </header>
              <div className="post-title">
                Offering disinfecting clorox wipes
              </div>
              <div className="post-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliquLorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </OrgPost>
            <div className="message-content">
              Hi Lily, I have 2 packs of disinfecting wipes and can give them to
              you for free. Hi Lily, I have 2 packs of disinfecting wipes and
              can give them to you for free. Hi Lily, I have 2 packs of
              disinfecting wipes and can give them to you for free.
            </div>
          </SenderBubble>
        </BubbleContainer>
      );
    };
    const Recipient = (props) => {
      const RecipientBubble = styled.div`
        width: 60%;
        background-color: #f6f7fb;
        padding: 0.8em 0.1em 0.8em 0.1em;
        border-radius: 0.1em 1em 1em 1em;
        letter-spacing: 1px;
        margin-top: 1em;
        word-wrap: break-word;
        .message-content {
          margin: 0em 1em 0em 1em;
        }
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          width: 70%;
        }
      `;
      const OrgPost = styled.div`
        display: ${(props) => (props.fromPost ? "block" : "none")};
        padding: 0.8em;
        background: #ffff;
        border-radius: 1em 1em 0em 0em;
        color: #282828;
        margin-bottom: 1em;
        header {
          display: flex;
          font-size: 0.9em;
          height: 2em;
          .post-type {
            margin-right: 0.5em;
            font-weight: 500;
          }
          span {
            font-size: 2em;
            position: relative;
            bottom: 0.7em;
          }
          .post-date {
            margin-left: 0.5em;
            opacity: 0.5;
          }
        }
        .post-title {
          font-size: 1.3em;
          font-weight: 700;
          margin: 0em 0em 0.2em 0em;
          @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
            margin: 0.2em 0em 0.2em 0em;
          }
        }
        .post-content {
          letter-spacing: 1.3px;
        }
      `;
      return (
        <RecipientBubble>
          <OrgPost fromPost={props.fromPost}>
            <header>
              <div className="post-type">Offers</div>
              <span>.</span>
              <div className="post-date">Posted 14hrs ago</div>
            </header>
            <div className="post-title">Offering disinfecting clorox wipes</div>
            <div className="post-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliquLorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </OrgPost>
          <div className="message-content">
            Hi Lily, I have 2 packs of disinfecting wipes and can give them to
            you for free. Hi Lily, I have 2 packs of disinfecting wipes and can
            give them to you for free. Hi Lily, I have 2 packs of disinfecting
            wipes and can give them to you for free.
          </div>
        </RecipientBubble>
      );
    };
    return (
      <MessagesContainer>
        <Recipient fromPost />
        <Sender />
        <Recipient />
        <Sender fromPost />
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

const EmptyInbox = () => {
  const MsgHeader = styled.div`
    display: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: block;
      position: absolute;
      top: 0;
      width: 100vw;
      border-bottom: 1px solid rgba(232, 232, 232, 0.7);
      padding: 1.6em 1.1em;
      font-size: 1.143em;
      font-weight: 700;
      span {
        position: absolute;
        left: 1em;
        bottom: 0.5em;
      }
    }
  `;
  const StyledButton = styled(Button)`
    width: 19rem;
    font-weight: 400;
    font-size: 1.143em;
    height: 3em;
    margin-top: 0.5em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      width: 18rem;
      font-size: 1em;
      letter-spacing: 0.5px;
    }
  `;
  const EmptyInboxContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 6em;
    p:first-of-type {
      margin-top: 2em;
    }
    p {
      line-height: 1;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        width: 80vw;
        text-align: center;
      }
    }
  `;

  return (
    <EmptyInboxContainer>
      <MsgHeader>
        <span>Messages</span>
      </MsgHeader>
      <img
        className="empty-inbox-logo"
        src={emptyinbox}
        alt="Empty Inbox Page"
      />
      <p>You haven't recieved any messages yet.</p>
      <p>Head back to Help Board to find offers or requests to respond to.</p>
      <Link to="/feed">
        <StyledButton primary="true">Go to Help Board</StyledButton>
      </Link>
    </EmptyInboxContainer>
  );
};

const Inbox = () => {
  const [empty, setEmpty] = useState(false);
  const [toggleMobileChatList, setToggleMobileChatList] = useState(false);
  return (
    <InboxContainer>
      {empty ? (
        <>
          <ChatList empty={empty} />
          <EmptyInbox />
        </>
      ) : (
        <>
          <ChatList
            empty={empty}
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
          <CurrentChat
            toggleMobileChatList={toggleMobileChatList}
            setToggleMobileChatList={setToggleMobileChatList}
          />
        </>
      )}
    </InboxContainer>
  );
};

export default Inbox;
