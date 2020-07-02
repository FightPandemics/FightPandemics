import React from "react";
import styled from "styled-components";
import NestedComments from "./NestedComments";

const CommentsWrapper = styled.div`
  padding-right: 1.5rem;
  margin: 2rem 0;
`;

const Comments = ({ comments, deleteComment, dispatchPostAction, user }) => {
  return (
    <CommentsWrapper>
      {comments &&
        comments.map((comment) => (
          <NestedComments
            comment={comment}
            key={comment._id}
            dispatchPostAction={dispatchPostAction}
            deleteComment={deleteComment}
            user={user}
          />
        ))}
    </CommentsWrapper>
  );
};

export default Comments;
