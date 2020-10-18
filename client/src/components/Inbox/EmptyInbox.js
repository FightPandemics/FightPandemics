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
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

export const EmptyInbox = () => {
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
