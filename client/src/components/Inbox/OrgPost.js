import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getRelativeTime from "utils/relativeTime";
import { theme, mq } from "constants/theme";

const Post = styled.div`
  display: block;
  padding: 1.12rem;
  background: #ffff;
  border-radius: 1.6rem 1.6rem 0.2rem 0.2rem;
  color: #282828;
  margin-bottom: 1.4rem;
  margin-top: 0.7rem;
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

export const OrgPost = ({ postRef }) => {
  const { t } = useTranslation();
  return (
    <Post>
      <header>
        <div className="post-type">{t(`feed.${postRef.objective}`)}</div>
        <span>.</span>
        <div className="post-date">
          {t(`relativeTime.${getRelativeTime(postRef.createdAt)[1]}WithCount`, {
            count: getRelativeTime(postRef.createdAt)[0],
          })}
        </div>
      </header>
      <Link to={`/post/${postRef.id}`}>
        <div className="post-title">{postRef.title}</div>
      </Link>
      <div className="post-content">
        {postRef.content.substring(0, 250)}
        {postRef.content.length > 250 && "..."}
      </div>
    </Post>
  );
};
