import React from "react";
import styled from "styled-components";
import emptyinbox from "assets/empty-inbox.svg";
import Button from "components/Button/SubmitButton";
import { Link } from "react-router-dom";
import { theme, mq } from "constants/theme";
import { useTranslation } from "react-i18next";

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
    text-align: center;
  }
  h3 {
    margin-top: 3.2rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  ${props=> props.mobile?`
    padding: 0;
    margin-top: 1em;
    @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
      display: none;
    }
  ` : `
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: none;
    }
  `}

`;

export const EmptyInbox = ({mobile}) => {
  const { t } = useTranslation();
  return (
    <EmptyInboxContainer mobile={mobile}>
      <img
        className="empty-inbox-logo"
        src={emptyinbox}
        alt="Empty Inbox Page"
      />
      <h3>{t("messaging.emptyInbox.header")}</h3>
      <p>{t("messaging.emptyInbox.p1")}</p>
      <p>{t("messaging.emptyInbox.p2")}</p>
      <Link to="/feed">
        <StyledButton primary="true">{t("messaging.emptyInbox.goToHB")}</StyledButton>
      </Link>
    </EmptyInboxContainer>
  );
};
