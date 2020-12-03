// Core
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, WhiteSpace } from "antd-mobile";
import { Divider, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

// Local
import FilterTag from "components/Tag/FilterTag";
import Heading from "components/Typography/Heading";
import PostCard from "./PostCard";
import PostActions from "./PostActions";

import {
  typeToTag,
  translateISOTimeTitle,
} from "assets/data/formToPostMappings";

import filterOptions from "assets/data/filterOptions";
import {
  getOptionText,
  highlightSearchRegex,
  authorProfileLink,
} from "../Feed/utils";
import { selectActorId } from "reducers/session";

export const AntDivider = styled(Divider)`
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  left: 8rem;
  margin: -2rem 0;
`;
export const LeftHeader = styled.p`
  padding: 0;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  vertical-align: middle;
  text-align: center;
  div {
    font-size: 5rem;
    font-weight: bolder;
    color: darkgray;
  }
`;

const filters = Object.values(filterOptions);

const Highlight = ({ text = "", highlight = "" }) => {
  if (!highlight || !highlight.trim()) {
    return text;
  }
  const regex = highlightSearchRegex(highlight);
  const parts = text.split(regex);
  return parts
    .filter((part) => part)
    .map((part) =>
      regex.test(part) ? <span className={"highlighted"}>{part}</span> : part,
    );
};

export const CONTENT_LENGTH = 120;
const Post = ({
  currentPost,
  highlightWords,
  includeProfileLink,
  user,
  keepScrollIndex,
  keepPageState,
  keepPostsState,
}) => {
  const { t } = useTranslation();

  let post;
  if (currentPost) {
    post = currentPost;
  }

  const { _id, content, title, reportsCount } = post || {};

  const actorId = useSelector(selectActorId);

  const renderHeader = (
    <Card.Header
      title={
        <div className="title-wrapper">
          <span className="author">
            <Highlight text={post?.author?.name} highlight={highlightWords} />
          </span>
          <span className="timestamp">
            Posted{" "}
            <Tooltip title={translateISOTimeTitle(post.createdAt)}>
              <span className="timestamp">
                {t(
                  `relativeTime.${post?.elapsedTimeText?.created?.unit}WithCount`,
                  {
                    count: post?.elapsedTimeText?.created?.count,
                  },
                )}
                {post?.elapsedTimeText?.isEdited && ` · ${t("post.edited")}`}
              </span>
            </Tooltip>
          </span>
        </div>
      }
    />
  );

  const renderHeaderWithLink = (
    <Link to={authorProfileLink(post)}>{renderHeader}</Link>
  );

  const renderTags = (
    <Card.Body>
      {post.reportedBy
        .map((report) => report.reason)
        .join("|")
        .split("|")
        .filter((e) => e && e !== "Other")
        .map((reason, idx) => (
          <FilterTag key={idx} disabled={true} selected={false}>
            {reason}
          </FilterTag>
        ))}
    </Card.Body>
  );

  const [showComplete, setShowComplete] = useState(true);

  return (
    <>
      <PostCard>
        <LeftHeader>
          <div>{reportsCount}</div> Reports
        </LeftHeader>

        <AntDivider type="vertical" plain>
          <div className="card-header">
            {includeProfileLink ? renderHeaderWithLink : renderHeader}
          </div>
          <WhiteSpace size="md" />
          {renderTags}
          <WhiteSpace />
          {post ? (
            <Link
              to={{
                pathname: `/post/${_id}`,
                state: {
                  post: post,
                  postId: _id,
                  from: window.location.href,
                  user,
                  keepScrollIndex,
                  keepPageState,
                  keepPostsState,
                },
              }}
            >
              {renderContent(title, content, highlightWords, showComplete)}
            </Link>
          ) : (
            <>
              {/*
                Include hidden link for meta crawler but not on
                profiles to avoid duplicate crawling of same posts
              */}
              {includeProfileLink && (
                <Link to={`/post/${_id}`} style={{ display: "none" }}></Link>
              )}
              {renderContent(title, content, highlightWords, showComplete)}
            </>
          )}
          <Card.Body className="view-more-wrapper" />
          <Card.Body className="content-wrapper">
            <PostActions />
          </Card.Body>
        </AntDivider>
      </PostCard>
    </>
  );
};

const renderContent = (title, content, highlightWords, showComplete) => {
  let finalContent = content;
  if (finalContent.length > CONTENT_LENGTH && !showComplete) {
    finalContent = `${finalContent.substring(0, CONTENT_LENGTH)} . . .`;
  }
  return (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        <Highlight text={title} highlight={highlightWords} />
      </Heading>
      <p className="post-description">
        <Highlight text={finalContent} highlight={highlightWords} />
      </p>
    </Card.Body>
  );
};

export default Post;
