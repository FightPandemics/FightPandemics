import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const Post = styled.div`
  display: block;
  padding: 0.8em;
  background: #ffff;
  border-radius: 1em 1em 0em 0em;
  color: #282828;
  margin-bottom: 1em;
  header {
    display: flex;
    font-size: 0.9em;
    height: 2em;
    .post-type {
      margin-right: 0.5em;
      font-weight: 500;
    }
    span {
      font-size: 2em;
      position: relative;
      bottom: 0.7em;
    }
    .post-date {
      margin-left: 0.5em;
      opacity: 0.5;
    }
  }
  .post-title {
    font-size: 1.3em;
    font-weight: 700;
    margin: 0em 0em 0.2em 0em;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 0.2em 0em 0.2em 0em;
    }
  }
  .post-content {
    letter-spacing: 1.3px;
  }
`;

export const OrgPost = (props) => {
  return (
    <Post>
      <header>
        <div className="post-type">Offers</div>
        <span>.</span>
        <div className="post-date">Posted 14hrs ago</div>
      </header>
      <div className="post-title">Offering disinfecting clorox wipes</div>
      <div className="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliquLorem
      </div>
    </Post>
  );
};
