import styled from "styled-components";
import { mq } from "constants/theme";

export const Container = styled.div`
  h4 {
    font-size: 0.857em;
    color: rgba(0, 0, 0, 0.2);
  }
  margin-bottom: 1em;
`;

export const RefPost = styled.div`
  height: 7.571em;
  width: 42.286em;
  border-radius: 6px;
  padding: 1.3em 1em 1.3em 0em;
  z-index: 9999;
  opacity: 1;
  header {
    .author {
      font-size: 0.857em;
      font-weight: 600;
      position: relative;
      bottom: 1em;
    }
    h3 {
      font-size: 1.143em;
      font-weight: 700;
    }
    .ant-avatar {
      height: 1.8em;
      line-height: 2.4rem;
      margin-right: 0.7rem;
      margin-left: 0.7rem;
      width: 1.8em;
      display: inline-block;
    }
  }
  .content {
    font-size: 1em;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    header > h3,
    .content {
      width: 80%;
      max-width: 32.143em;
    }
  }
  @media screen and (max-width: 570px) {
    header > h3,
    .content {
      width: 70%;
      max-width: 32.143em;
    }
  }
  @media screen and (max-width: ${mq.phone.narrow.maxWidth}) {
    header > h3,
    .content {
      width: 60%;
      max-width: 32.143em;
    }
  }
  @media screen and (max-width: 321px) {
    header > h3,
    .content {
      width: 50%;
      max-width: 32.143em;
    }
  }
  @media screen and (max-width: 282px) {
    header > h3,
    .content {
      width: 40%;
      max-width: 32.143em;
    }
  }
`;
