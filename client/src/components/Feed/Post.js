import React, { useState } from "react";
import { Modal, Card, WhiteSpace } from "antd-mobile";
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import Comments from "./Comments";
import FilterTag from "../../components/Tag/FilterTag";
import AutoSize from "../../components/Input/AutoSize";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "~/assets/icons/status-indicator.svg";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  // mock API to test functionality
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState("");
  const [fakeLikes, setFakeLikes] = useState(post.numLikes);
  const [fakeComments, setFakeComments] = useState(post.numComments);
  const [fakeShares, setFakeShares] = useState(post.numShares);

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
      title={post.author}
      thumb={post.photoUrl}
      extra={
        <span>
          <SvgIcon src={statusIndicator} className="status-icon" />
          {post.location}
        </span>
      }
    />
  );

  const renderContent = (
    <Card.Body>
      <h1>{post.title}</h1>
      <p className="post-description">{post.description}</p>
    </Card.Body>
  );

  const renderTags = (
    <Card.Body>
      {post.tags.map((tag, idx) => (
        <FilterTag key={idx} disabled={true} selected={false}>
          {tag}
        </FilterTag>
      ))}
    </Card.Body>
  );

  const renderViewMore = (
    <Card.Body>
      <span className="view-more">View More</span>
    </Card.Body>
  );

  const renderComments = (
    <Card.Body>
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
    <Card.Body>
      <PostSocial
        url={post.url}
        liked={liked}
        shared={shared}
        showComments={showComments}
        numLikes={fakeLikes}
        numComments={fakeComments}
        numShares={fakeShares}
        setShowComments={() => setShowComments(!showComments)}
        onCopyLink={() => {
          if (!shared) setFakeShares(fakeShares + 1);
          setShared(true);
          return setCopied(!copied);
        }}
        likePost={() => {
          liked ? setFakeLikes(fakeLikes - 1) : setFakeLikes(fakeLikes + 1);
          return setLiked(!liked);
        }}
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
      <h1 style={{ color: "black" }}>Link Copied!</h1>
    </Modal>
  );

  return (
    <PostCard>
      {renderHeader}
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
