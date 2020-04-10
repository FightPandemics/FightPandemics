import React from "react";
import { Comment, Avatar } from "antd";
import moment from "moment";

const NestedComments = ({ comment }) => {
  const nestedComments = (comment.children || []).map((comment) => {
    return <NestedComments comment={comment} key={comment._id} />;
  });
  return (
    <Comment
      actions={[
        <span>{moment().fromNow()}</span>,
        <span key="comment-basic-like">Like</span>,
        <span key="comment-nested-reply-to">Reply</span>,
      ]}
      author={<a href="#">{comment.name}</a>}
      avatar={
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGhWTUkY0xGbbdHyReD6227iz53ADtRmcn1PTN4GUS3clC6MCT&usqp=CAU"
          alt={`${comment.name}`}
        />
      }
      content={<p>{comment.comment}</p>}
    >
      {nestedComments}
    </Comment>
  );
};

export default NestedComments;
