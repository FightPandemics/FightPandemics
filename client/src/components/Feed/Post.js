import React, { useState } from "react";
import styled from "styled-components";
import { SELAGO } from "../../constants/colors";
import { Modal, Card, WhiteSpace } from "antd-mobile";
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import FilterTag from "../../components/Tag/FilterTag";
import TextInput from "../../components/Input/TextInput";
import StatusIcon from "../Icon/status-indicator";

export default ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

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
  } = post;

  const thumbStyle = {
    borderRadius: "40px",
    width: "40px",
    height: "40px",
    maxWidth: "100%",
  };

  const commentStyles = {
    backgroundColor: SELAGO,
    width: "86%",
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
        <p>{description}</p>
      </Card.Body>
      <Card.Body>
        <a className="view-more" href="">
          View More
        </a>
      </Card.Body>
      <Card.Body>
        <PostSocial
          url={url}
          numLikes={numLikes}
          numComments={numComments}
          numShares={numShares}
          onCopy={() => setCopied(!copied)}
        />
      </Card.Body>
      <Card.Body>
        <TextInput
          type={"text"}
          style={commentStyles}
          placeholder={"Write a comment ..."}
        />
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
