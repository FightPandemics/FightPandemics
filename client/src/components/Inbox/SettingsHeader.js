import React, { useContext } from "react";
import styled from "styled-components";
import arrow from "assets/icons/blue-down-arrow.svg";
import { theme, mq } from "constants/theme";
import { ChatContext } from "context/ChatContext";

const TabName = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  height: 3.5em;
  overflow: auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 1em;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    background-color: #ffffff;
    position: absolute;
    top: 0;
    z-index: 3;
  }
  .back-arrow {
    display: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: inline;
      transform: rotate(90deg);
      padding-top: 1em;
      cursor: pointer;
    }
  }
  h4 {
    position: relative;
    top: 0.2em;
    font-size: 1.071em;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50%;
    line-height: 1.1;
  }
`;

export const SettingsHeader = ({ tabName }) => {
  const { setToggleMobileChatList } = useContext(ChatContext);

  return (
    <>
      {tabName && (
        <TabName>
          <img
            className="back-arrow"
            onClick={() => {
              setToggleMobileChatList(true);
            }}
            src={arrow}
            alt="Back Arrow"
          />
          <h4>{tabName}</h4>
        </TabName>
      )}
    </>
  );
};
