import React from "react";
import { Comment, Avatar } from "antd";

const PostComment = ({ comment }) => {
  const nestedComments = (comment.children || []).map((comment) => {
    return <PostComment comment={comment} />;
  });
  return (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply</span>]}
      author={<a>{comment.name}</a>}
      avatar={
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGhWTUkY0xGbbdHyReD6227iz53ADtRmcn1PTN4GUS3clC6MCT&usqp=CAU"
          alt="Han Solo"
        />
      }
      content={<p>{comment.comment}</p>}
    >
      {nestedComments}
    </Comment>
  );
};

export default ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <PostComment comment={comment} />
      ))}
    </div>
  );
};
