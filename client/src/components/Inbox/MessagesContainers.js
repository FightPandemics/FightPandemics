import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const BubbleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  &.recipient {
    justify-content: flex-start;
  }
  small {
    position: relative;
    margin: 0 10px;
    top: 50%;
    font-style: italic;
  }
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    &.is-editing {
      margin-bottom: 3rem;
      div {
        min-width: 40%;
      }
    }
  }
  .edit-controls {
    position: absolute;
    bottom: -2.7rem;
    button {
      cursor: pointer;
      font-size: 1.3rem;
      background: none;
      color: #425af2;
      border: 1px solid #425af2;
      border-radius: 1.1rem;
      padding: 0.3rem 1rem;
      margin: 0 0.2rem;
      &.save {
        color: #fff;
        background: #425af2;
      }
    }
  }
`;
export const MessagesContainer = styled.div`
  position: fixed;
  width: calc(100% - 33.6rem);
  max-height: ${(props) => {
    if (
      props.status === "pending" ||
      props.blockStatus === "was-blocked" ||
      props.blockStatus === "did-block"
    ) {
      return "calc(100vh - 22.4rem);";
    }
    return "calc(100vh - 17.8rem);";
  }}
  bottom: ${(props) => {
    if (
      props.status === "pending" ||
      props.blockStatus === "was-blocked" ||
      props.blockStatus === "did-block"
    ) {
      return "10.6rem;";
    }
    return "6rem;";
  }}
  right: 0;
  display: block;
  padding: 0 1rem;
  -webkit-overflow-scrolling: touch;
  white-space: pre-wrap;
  overflow-y: scroll;
  &.request-page {
    max-height: calc(100vh - 25.7rem);
    bottom: 14rem;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100vw;
    max-height: ${(props) => {
      if (
        props.status === "pending" ||
        props.blockStatus === "was-blocked" ||
        props.blockStatus === "did-block"
      ) {
        return "calc(100vh - 20.4rem);";
      }
      return "calc(100vh - 15.9rem);";
    }}
    bottom: ${(props) => {
      if (
        props.status === "pending" ||
        props.blockStatus === "was-blocked" ||
        props.blockStatus === "did-block"
      ) {
        return "10rem;";
      }
      return "5.1rem;";
    }}
    &.request-page {
      bottom: 20rem;
      max-height: calc(100vh - 31rem);
    }
  }
  &.input-expanded {
    max-height: calc(100vh - 22.2rem);
    bottom: 10.5rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      max-height: calc(100vh - 20.6rem);
      bottom: 10rem;
    }
  }
  a {
    text-decoration: underline;
    &:hover {
      color: inherit;
      opacity: 0.7;
    }
  }
  .load-more-btn {
    border: none;
    width: 100%;
    background: transparent;
    color: #425af2;
    padding: 5px;
    cursor: pointer;
  }
  small {
    opacity: 0.7;
  }
`;

export const SenderBubble = styled.div`
  position: relative;
  display: inline-block;
  max-width: 60%;
  background-color: #425af2;
  color: white;
  padding: 1.12rem 0.14rem 1.12rem 0.14rem;
  border-radius: 2.2rem 2.2rem 0rem 2.2rem;
  letter-spacing: 1px;
  margin-top: 1.4rem;
  word-break: break-word;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    ${(props) => `${props.editingMode ? "min-height: 8rem;" : ""}`}
  }
  &:hover div:first-child,
  .ant-dropdown-open {
    display: block;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    user-select: none;

    &:hover div.ant-dropdown-trigger {
      display: none;
    }
  }
  .message-content-sender {
    padding: 0em 1.4rem 0em 1.4rem;
  }
  textarea {
    position: absolute;
    resize: none;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 1.4rem 0rem 0.14rem 1.4rem;
    padding: 1.12rem;
    overflow: auto;
    color: black;
    max-height: 15rem;
    min-height: 8rem;
  }
  &.deleted {
    opacity: 0.7;
    background: #fff;
    color: #969292;
    font-style: italic;
    border: 1px solid #969292;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 70%;
  }
`;

export const RecipientBubble = styled.div`
  display: inline-block;
  max-width: 60%;
  background-color: #f3f4fe;
  padding: 1.12rem 0.14rem 1.12rem 0.14rem;
  border-radius: 1.6rem 1.6rem 1.6rem 0.2rem;
  letter-spacing: 1px;
  margin-top: 1.4rem;
  word-break: break-word;
  .message-content-recipient {
    padding: 0em 1.4rem 0em 1.4rem;
  }
  &.deleted {
    opacity: 0.7;
    background: #fff;
    color: #969292;
    font-style: italic;
    border: 1px solid #969292;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 70%;
  }
`;

export const TimeStamp = styled.small`
  color: #969292;
  padding: 2px 1rem;
  opacity: 1 !important;
  display: block;
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
`;

export const MessageMenu = styled.div`
  position: absolute;
  display: none;
  background: #ffffff;
  width: 3.5rem;
  height: 1.75rem;
  right: 0.8rem;
  top: -0.8rem;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 10px 0 #0000002e;
  img {
    width: 70%;
    opacity: 0.4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
