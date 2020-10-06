import { Modal, Button } from "antd";
import styled from "styled-components";
import { mq } from "constants/theme";

export const MsgBtn = styled(Button)`
  color: white;
  margin-left: 1.429em;
`;

export const MsgModal = styled(Modal)`
  .ant-modal-title {
    font-weight: 700;
    font-size: 1.2em;
  }
  .ant-modal-close-x {
    display: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: block;
    }
  }
  .ant-modal-header {
    border-bottom: none;
    font-size: 1.286em;
    padding: 1em 0;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
    border-top: none;
    bottom: 1em;
    width: 100%;
    border-radius: none;
    padding: 0.714em 5px;
    .ant-btn {
      box-shadow: none;
      height: 2.5em;
      width: 8.643em;
      font-size: 1.143em;
      letter-spacing: 0.5px;
      outline: none;
      transition: none;
      -webkit-transition: none;
      :first-child {
        border: none;
        border-radius: none;
        background-color: white;
        color: #425af2;
        position: relative;
        top: 0.4em;
      }
      :last-child {
        border: 0.2rem solid #425af2;
        border-radius: 4.6rem;
        background-color: #425af2;
        color: white;
        position: relative;
        top: 0.4em;
      }
    }
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-radius: 0;
      .ant-modal-close-x {
        display: block;
      }
      button {
        margin-left: 0;
      }
      .ant-btn:last-child,
      div {
        right: 0;
        width: 100%;
      }
      .ant-btn:first-child {
        display: none;
      }
    }
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-content {
    position: relative;
    right: 6em;
    height: 31.071em;
    width: 46.857em;
    border-radius: 0.714em;
    padding: 1.5em 2em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      border-radius: 0;
      background-color: white;
    }
  }

  textarea {
    border: 1px solid lightgrey;
    border-radius: 6px;
    height: 9.714em;
    width: 100%;
    margin: 0 0 1em 0;
    padding: 1em;
    resize: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      height: 51vh;
      margin: 2.3em 0 0.5em 0;
    }
    @media screen and (max-width: 570px) {
      height: 48vh;
      margin: 2.3em 0 0.1em 0;
    }
    @media screen and (max-width: 282px) {
      height: 51vh;
      margin: 3.5em 0 0em 0;
    }
    :focus {
      border: 1px solid #425af2;
    }
  }
`;

export const SuccessModal = styled(MsgModal)`
  p {
    padding-top: 1em;
    width: 100%;
    font-size: 1.143em;
  }
  .ant-modal-title {
    text-align: center;
    padding-top: 1em;
    font-size: 1.571em;
  }
  .ant-modal-content {
    height: 20.5em;
    width: 46.857em;
    border-radius: 0.714em;
    padding: 1.5em 2em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      position: relative;
      margin: auto;
      height: 50%;
      width: 90%;
      border-radius: 0.714em;
      padding: 1.5em 2em;
    }
  }
  .ant-modal-footer > div {
    position: absolute;
    bottom: 2.143em;
    right: 6.786em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      position: static;
    }
  }
  .ant-btn:last-child {
    border: 0.2rem solid #425af2;
    border-radius: 4.6rem;
    background-color: #425af2;
    color: white;
    width: 14.143em;
    box-shadow: none;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0.9em;
    z-index: 999;
  }
`;

export const FailedModal = styled(SuccessModal)`
  p {
    font-size: 1em;
    text-align: center;
  }
  .ant-modal-title {
    padding-top: 0.5em;
  }
  .ant-modal-content {
    height: 14em;
    width: 50em;
    padding: 0em 6em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      position: relative;
      padding: 0em 2em;
      margin: auto;
      width: 90%;
      height: 50%;
    }
  }
  .ant-btn {
    :first-child {
      display: block !important;
    }
    :last-child {
      display: none !important;
    }
  }
  .ant-modal-footer > div {
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 0.5em;
    width: 100%;
    right: 0;
  }
  .ant-modal-close-x {
    display: none;
  }
`;

export const PrivateMessageContainer = styled.div`
  margin-left: 3em;
  :hover {
    color: #939393;
  }
  svg {
    position: relative;
    top: 0.2em;
  }
  span {
    position: relative;
    left: 0.5em;
  }
`;
