import React from "react";
import styled from "styled-components";
import emptyinbox from "assets/empty-inbox.svg";
import Button from "components/Button/SubmitButton";
import { Link } from "react-router-dom";
import { theme, mq } from "constants/theme";

const MsgHeader = styled.div`
  display: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    position: absolute;
    top: 0;
    width: 100vw;
    border-bottom: 0.1rem solid rgba(232, 232, 232, 0.7);
    padding: 2.2rem 1.54rem;
    font-size: 1.4rem;
    font-weight: 700;
    span {
      position: absolute;
      left: 1.4rem;
      bottom: 0.7rem;
    }
  }
`;
const EmptyInboxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p:first-of-type {
    margin-top: 2.8rem;
  }
  p {
    line-height: 1;
  }
  h3 {
    margin-top: 3.2rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

export const SelectRoom = ({ isRequestPage }) => {
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
      {isRequestPage ? (
        <>
          <h3>Select any message request to read</h3>
          <p>
            The content of message request would apprear here once you select{" "}
          </p>
          <p>one from the message request inbox.</p>
        </>
      ) : (
        <>
          <h3>Select any message to read</h3>
          <p>The message content would apprear here once you select</p>
          <p>a message from the message inbox</p>
        </>
      )}
    </EmptyInboxContainer>
  );
};
