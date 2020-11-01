import React, { useContext } from "react";
import styled from "styled-components";
import arrow from "assets/icons/blue-down-arrow.svg";
import { mq } from "constants/theme";
import { ChatContext } from "context/ChatContext";

const TabName = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  min-height: 5.8rem;
  overflow: auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 1.4rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    background-color: #ffffff;
    position: absolute;
    top: 1rem;
    min-height: 4.8rem;
    z-index: 3;
  }
  .back-arrow {
    display: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: inline;
      transform: rotate(90deg);
      padding-top: 1.4rem;
      cursor: pointer;
      margin-right: 1.6rem;
    }
  }
  h4 {
    position: relative;
    top: 0;
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 70px);
    line-height: 1.1;
  }
`;

export const SettingsHeader = ({ tabName }) => {
  const { setToggleMobileChatList } = useContext(ChatContext);

  return (
    <>
      {tabName && (
        <TabName
          onClick={() => {
            setToggleMobileChatList(true);
          }}
        >
          <img className="back-arrow" src={arrow} alt="Back Arrow" />
          <h4>{tabName}</h4>
        </TabName>
      )}
    </>
  );
};
