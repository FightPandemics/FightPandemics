import React from "react";
import styled from "styled-components";
import emptyinbox from "assets/empty-inbox.svg";
import { theme, mq } from "constants/theme";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <EmptyInboxContainer>
      <MsgHeader>
        <span>{t("messaging.header")}</span>
      </MsgHeader>
      <img
        className="empty-inbox-logo"
        src={emptyinbox}
        alt="Empty Inbox Page"
      />
      {isRequestPage ? (
        <>
          <h3>{t("messaging.selectRequest.header")}</h3>
          <p>{t("messaging.selectRequest.p1")}</p>
          <p>{t("messaging.selectRequest.p2")}</p>
        </>
      ) : (
        <>
          <h3>{t("messaging.selectRoom.header")}</h3>
          <p>{t("messaging.selectRoom.p1")}</p>
          <p>{t("messaging.selectRoom.p2")}</p>
        </>
      )}
    </EmptyInboxContainer>
  );
};
