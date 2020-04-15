import React from "react";
import styled from "styled-components";
import NestedComments from "./NestedComments";

const CommentsWrapper = styled.div`
  padding: 0 5px;
  margin: 20px 0;
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
