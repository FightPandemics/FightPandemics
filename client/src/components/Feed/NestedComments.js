import React, { useState } from "react";
import { Avatar } from "antd";
import { ROYAL_BLUE } from "../../constants/colors";
import HeartSmallIcon from "../Icon/heart-small";
import StyledComment from "./StyledComment";

const NestedComments = ({ comment }) => {
  const [likedComment, setLikedComment] = useState(false);
  const [fakeNumLikes, setFakeNumLikes] = useState(comment.numLikes);

  const handleLikeComment = () => {
    likedComment
      ? setFakeNumLikes(fakeNumLikes - 1)
      : setFakeNumLikes(fakeNumLikes + 1);
    setLikedComment(!likedComment);
  };

  const renderLikeButton = () => {
    const style = likedComment ? { color: ROYAL_BLUE, fontWeight: "bold" } : {};
    return (
      <span style={style} onClick={handleLikeComment} key="comment-basic-like">
        Like
      </span>
    );
  };

  const renderNumLikes =
    comment.numLikes > 0 ? (
      <span className="comment-likes">
        <HeartSmallIcon />
        {fakeNumLikes}
      </span>
    ) : (
      ""
    );

  const renderReplyTo = <span key="comment-nested-reply-to">Reply</span>;
  const renderTimeStamp = <span>1w</span>;

  const commentActions = [
    // order matters
    renderTimeStamp,
    renderLikeButton(),
    renderReplyTo,
    renderNumLikes,
  ];

  const renderAvatar = (
    <Avatar
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGhWTUkY0xGbbdHyReD6227iz53ADtRmcn1PTN4GUS3clC6MCT&usqp=CAU"
      alt={`${comment.name}`}
    />
  );

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
