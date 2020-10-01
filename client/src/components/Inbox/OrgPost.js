import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import getRelativeTime from "utils/relativeTime";
import { Link } from "react-router-dom";

const Post = styled.div`
  display: block;
  padding: 0.8em;
  background: #ffff;
  border-radius: 1em 1em 0em 0em;
  color: #282828;
  margin-bottom: 1em;
  margin-top: -0.7em;
  max-height: 340px;
  overflow: hidden;
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
    white-space: break-spaces;  
  }
  a {
    &:hover {
      color: inherit;
    }
  }
`;

export const OrgPost = ({postRef}) => {
  return (
    <Post>
      <header>
        <div className="post-type">{postRef.objective}</div>
        <span>.</span>
        <div className="post-date">{getRelativeTime(postRef.createdAt)}</div>
      </header>
      <Link to={`/post/${postRef.id}`}>
        <div className="post-title">{postRef.title}</div>
      </Link>
      <div className="post-content">
        {postRef.content.substring(0,250)}{postRef.content.length>250 && "..."}
      </div>
    </Post>
  );
};
