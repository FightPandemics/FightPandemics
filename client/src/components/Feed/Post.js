import React, { useState } from "react";
import { Modal, Card, WhiteSpace } from "antd-mobile";
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import Comments from "./Comments";
import FilterTag from "../../components/Tag/FilterTag";
import StatusIcon from "../Icon/status-indicator";
import TextInput from "../../components/Input/TextInput";
import { SELAGO } from "../../constants/colors";

export default ({ post }) => {
  const {
    title,
    description,
    author,
    photoUrl,
    location,
    tags,
    numLikes,
    numComments,
    numShares,
    url,
    comments,
  } = post;

  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);

  // mock API to test functionality
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [fakeLikes, setFakeLikes] = useState(numLikes);
  const [fakeComments, setFakeComments] = useState(numComments);
  const [fakeShares, setFakeShares] = useState(numShares);

  const thumbStyle = {
    borderRadius: "40px",
    width: "40px",
    height: "40px",
    maxWidth: "100%",
  };

  const commentStyles = {
    backgroundColor: SELAGO,
    width: "96%",
    borderBottom: "unset",
    borderRadius: "40px",
    padding: "14px",
  };

  const renderTags = () => {
    return tags.map((tag, idx) => (
      <FilterTag label={tag} selected={false} disabled={true} key={idx} />
    ));
  };

  return (
    <PostCard>
      <Card.Header
        title={author}
        thumbStyle={thumbStyle}
        extra={
          <span>
            <StatusIcon className="status-icon" />
            {location}
          </span>
        }
        thumb={photoUrl}
      />
      <WhiteSpace size="lg" />
      <Card.Body>{renderTags()}</Card.Body>
      <WhiteSpace />
      <Card.Body>
        <h1>{title}</h1>
        <div className="post-description">
          <p>{description}</p>
        </div>
      </Card.Body>
      <Card.Body>
        <a className="view-more" href="">
          View More
        </a>
      </Card.Body>
      <Card.Body>
        <PostSocial
          url={url}
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
      <Card.Body>
        <TextInput
          type={"text"}
          style={commentStyles}
          placeholder={"Write a comment ..."}
        />
        {showComments ? <Comments comments={comments} /> : ""}
      </Card.Body>
      <Modal
        onClose={() => setCopied(!copied)}
        maskClosable={true}
        closable={true}
        visible={copied}
        transparent
      >
        <h1 style={{ color: "black" }}>Link Copied!</h1>
      </Modal>
    </PostCard>
  );
};
