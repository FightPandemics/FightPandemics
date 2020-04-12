import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { ROYAL_BLUE, LIGHTER_GRAY } from "../../constants/colors";
import HeartSmallIcon from "../Icon/heart-small";
import StyledComment from "./StyledComment";
import BaseInput from "../Input/BaseInput";

const replyInputStyle = {
  backgroundColor: LIGHTER_GRAY,
  width: "100%",
  borderBottom: "unset",
  borderRadius: "4rem",
  padding: "1.4rem",
  marginTop: "1rem",
};

const Reply = styled.div`
  display: flex;
  align-items: center;
  span {
    padding-right: 0 !important;
  }
  input {
    background-color: ${LIGHTER_GRAY};
    width: 100%;
    border-bottom: unset;
    border-radius: 4rem;
    padding: 1.4rem;
    margin-top: 1rem;
  }
`;

const clickedTextStyle = { color: ROYAL_BLUE, fontWeight: "bold" };

const NestedComments = ({ comment }) => {
  const [likedComment, setLikedComment] = useState(false);
  const [fakeNumLikes, setFakeNumLikes] = useState(comment.numLikes);
  const [fakeNumReplies, setFakeNumReplies] = useState(comment.children.length);
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const renderAvatar = (
    <Avatar
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGhWTUkY0xGbbdHyReD6227iz53ADtRmcn1PTN4GUS3clC6MCT&usqp=CAU"
      alt={`${comment.name}`}
    />
  );

  const handleLikeComment = () => {
    likedComment
      ? setFakeNumLikes(fakeNumLikes - 1)
      : setFakeNumLikes(fakeNumLikes + 1);
    setLikedComment(!likedComment);
  };

  const renderLikeButton = () => {
    const style = likedComment ? clickedTextStyle : {};
    return (
      <span style={style} onClick={handleLikeComment} key="comment-basic-like">
        Like
      </span>
    );
  };

  const renderNumLikes = () => {
    return fakeNumLikes > 0 ? (
      <span className="comment-likes">
        <HeartSmallIcon />
        {fakeNumLikes}
      </span>
    ) : (
      ""
    );
  };

  const handleReply = (e) => {
    e.preventDefault();
    const testNewReply = {
      _id: 10,
      name: "Guest User",
      numLikes: 0,
      children: [],
      comment: reply,
    };
    comment.children.push(testNewReply); // not good but mocking API and testing UI
    setFakeNumReplies(fakeNumReplies + 1);
    setShowReply(!showReply);
    setReply("");
  };

  const renderReplyInput = showReply ? (
    <Reply>
      {renderAvatar}
      <form onSubmit={handleReply}>
        <BaseInput
          type="text"
          placeholder="Write a reply ..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </form>
    </Reply>
  ) : (
    ""
  );

  const renderReply = () => {
    const style = showReply ? clickedTextStyle : {};
    return (
      <span
        style={style}
        onClick={() => setShowReply(!showReply)}
        key="comment-nested-reply-to"
      >
        Reply
      </span>
    );
  };
  const renderTimeStamp = <span>1w</span>;

  const commentActions = [
    // order matters
    renderTimeStamp,
    renderLikeButton(),
    renderReply(),
    renderNumLikes(),
    renderReplyInput,
  ];

  const nestedComments = (comment.children || []).map((comment) => {
    return <NestedComments comment={comment} key={comment._id} />;
  });

  return (
    <div>
      <StyledComment
        actions={commentActions}
        author={<span>{comment.name}</span>}
        avatar={renderAvatar}
        content={<p>{comment.comment}</p>}
      >
        {nestedComments}
      </StyledComment>
    </div>
  );
};

export default NestedComments;
