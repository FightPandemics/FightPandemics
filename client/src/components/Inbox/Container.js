import styled from "styled-components";
import { mq } from "constants/theme";

export const InboxContainer = styled.div`
  width: 93%;
  min-width: 50em;
  max-width: 96em;
  min-height: 37em;
  height: calc(100% - 12rem);
  position: absolute;
  background-color: white;
  display: flex;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100vw;
    min-width: 20em;
  }
`;
export const ChatHeader = styled.div`
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  padding: 1.6em 1.1em;
  font-size: 1.143em;
  font-weight: 700;
  span {
    margin-left: 1em;
    background-color: #425af2;
    border-radius: 50%;
    padding: 0em 0.6em;
    color: white;
    font-size: 0.9em;
    font-weight: 400;
    min-width: 2em;
    min-height: 2em;
  }
`;
