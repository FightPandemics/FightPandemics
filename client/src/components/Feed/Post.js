// Core
import React, { useState } from "react";
import { Modal, Card, WhiteSpace } from "antd-mobile";

// Local
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import Comments from "./Comments";
import FilterTag from "components/Tag/FilterTag";
import AutoSize from "components/Input/AutoSize";
import Heading from "components/Typography/Heading";
import TextAvatar from "components/TextAvatar";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";
import { ReactComponent as SubMenuIcon } from "assets/icons/submenu.svg";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  const AvatarName = (post.authorName && post.authorName.match(/\b\w/g).join('').toUpperCase()) || '';

  // mock API to test functionality
  /* to be removed after full integration with user api */
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState("");
  const [fakeComments, setFakeComments] = useState(post.commentsCount);
  const [fakeShares, setFakeShares] = useState(0);

  const handleComment = (e) => {
    e.preventDefault();
    const testNewComment = {
      _id: 10,
      name: "Guest User",
      numLikes: 0,
      children: [],
      comment,
    };
    post.comments.push(testNewComment); // not good but mocking API and testing UI
    setFakeComments(fakeComments + 1);
    setShowComments(true);
    setComment("");
  };

  const renderHeader = (
    <Card.Header
      title={post.authorName}
      thumb={post.photoUrl ? post.photoUrl : <TextAvatar>{ AvatarName }</TextAvatar>}
      extra={
        <span>
          <SvgIcon src={statusIndicator} className="status-icon" />
          {post.location.country}
        </span>
      }
    />
  );

  const renderContent = (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        {post.title}
      </Heading>
      <p className="post-description">{post.content}</p>
    </Card.Body>
  );

  const renderTags = (
    <Card.Body>
      {post.types && post.types.map((tag, idx) => (
        <FilterTag key={idx} disabled={true} selected={false}>
          {tag}
        </FilterTag>
      ))}
    </Card.Body>
  );

  const renderViewMore = (
    <Card.Body className="view-more-wrapper">
      <span className="view-more">View More</span>
    </Card.Body>
  );

  const renderComments = (
    <Card.Body
      className={`comments-wrapper ${showComments ? "show-comments" : ""}`}
    >
      <AutoSize
        placeholder={"Write a comment..."}
        onPressEnter={handleComment}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      {showComments ? <Comments comments={post.comments} /> : ""}
    </Card.Body>
  );

  const renderSocialIcons = (
    <Card.Body className="content-wrapper">
      <PostSocial
        url={post.url}
        liked={ post.liked }
        shared={shared}
        showComments={showComments}
        numLikes={ post.likesCount }
        numComments={ post.commentsCount }
        numShares={fakeShares}
        setShowComments={() => setShowComments(!showComments)}
        onCopyLink={() => {
          if (!shared) setFakeShares(fakeShares + 1);
          setShared(true);
          return setCopied(!copied);
        }}
        id={ post._id }
      />
    </Card.Body>
  );

  const renderShareModal = (
    <Modal
      onClose={() => setCopied(!copied)}
      maskClosable={true}
      closable={true}
      visible={copied}
      transparent
    >
      <Heading level={4} className="h4">
        Link Copied!
      </Heading>
    </Modal>
  );

  return (
    <PostCard>
      <div className="card-header">
        {renderHeader}
        <div className="card-submenu">
          <SubMenuIcon />
        </div>
      </div>
      <WhiteSpace size="md" />
      {renderTags}
      <WhiteSpace />
      {renderContent}
      {renderViewMore}
      {renderSocialIcons}
      {renderComments}
      {renderShareModal}
    </PostCard>
  );
};

export default Post;
