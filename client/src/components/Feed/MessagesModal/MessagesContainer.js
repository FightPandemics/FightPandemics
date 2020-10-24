import { Modal, Button } from "antd";
import styled from "styled-components";
import { mq, theme } from "constants/theme";

const primaryColor = theme?.colors?.royalBlue;

export const MsgModal = styled(Modal)`
  min-width: 580px;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    min-width: 90vw;
    width: 90vw;
  }

  .ant-modal-title {
    font-weight: 700;
    font-size: 2.2rem;
  }

  .ant-modal-close-x {
    display: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: block;
    }
  }
  .ant-modal-header {
    border-bottom: none;
    padding: 1.4rem 0;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
    border-top: none;
    bottom: 1.4rem;
    width: 100%;
    border-radius: none;
    padding: 1rem 0.5rem;

    .ant-btn {
      box-shadow: none;
      height: 4rem;
      min-width: 14rem;
      font-size: 1.6rem;
      letter-spacing: 0.5px;
      outline: none;
      transition: none;
      -webkit-transition: none;

      :first-child {
        border: none;
        color: ${primaryColor};
      }
      :last-child {
        border: 0.2rem solid ${primaryColor};
        border-radius: 4.6rem;
        background-color: ${primaryColor};
        color: white;
      }
    }

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
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
    border-radius: 1rem;
    padding: 2.1rem 2.8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  textarea {
    border: 0.1rem solid lightgrey;
    border-radius: 0.6rem;
    min-height: 13.5rem;
    width: 100%;
    margin: 0 0 1.4rem 0;
    padding: 1.4rem;
    resize: none;
    font-family: ${theme.typography.font.family.body};
    :focus {
      border: 1px solid ${primaryColor};
    }
  }
`;

export const SuccessModal = styled(MsgModal)`
  top: 12.1rem;
  min-width: 61.5rem;
  max-width: 100vw;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    min-width: 90vw;
  }

  p {
    width: 100%;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 2.4rem;
  }
  .ant-modal-title {
    text-align: center;
    font-size: 2.2rem;
    line-height: 1.27;
    color: #333333;
    margin-bottom: 2.4rem;
  }
  .ant-modal-header {
    padding: 0;
  }
  .ant-modal-content {
    max-width: 65.6rem;
    border-radius: 1rem;
    padding: 2.4rem;
  }
  .ant-modal-footer {
    display: flex;
    text-align: center;
    flex-direction: column-reverse;
    padding: 0;
    align-items: center;

    .ant-btn:first-child {
      margin-top: 1.8rem;
      position: static;
      height: auto;
      padding: 0;
    }
    .ant-btn:last-child {
      border-radius: 4.6rem;
      background-color: ${primaryColor};
      color: white;
      width: 14.9rem;
      box-shadow: none;
      position: relative;
      margin: 0 auto;
      font-size: 1.4rem;
      padding: 1.9rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
  }
`;

export const FailedModal = styled(SuccessModal)`
  .ant-btn {
    :first-child {
      display: block !important;
      margin: 0 auto;
    }
    :last-child {
      display: none !important;
    }
  }
  .ant-modal-close-x {
    display: none;
  }
`;

export const PrivateMessageContainer = styled.div`
  margin-left: 4.2rem;
  cursor: pointer;
  :hover {
    color: #939393;
  }
  svg {
    position: relative;
    top: 0.28rem;
  }
  span {
    position: relative;
    left: 0.7rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: none;
    }
  }
`;
