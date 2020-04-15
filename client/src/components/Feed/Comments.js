import React from "react";
import styled from "styled-components";
import NestedComments from "./NestedComments";

const CommentsWrapper = styled.div`
  padding-right: 1.5rem;
  margin: 2rem 0;
`;

export default ({ comments }) => {
  return (
    <CommentsWrapper>
      {comments.map((comment) => (
        <NestedComments comment={comment} key={comment._id} />
      ))}
    </CommentsWrapper>
  );
};
