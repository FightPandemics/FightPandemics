import React from "react";
import { Comment, Avatar } from "antd";
import styled from "styled-components";
import { LIGHTER_GRAY } from "../../constants/colors";

const StyledComment = styled(Comment)`
  &.ant-comment {
    .ant-comment-inner {
      padding: 10px 0;
      .ant-comment-content {
        max-width: 30rem;
        .ant-comment-content-author {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          margin-bottom: 0;
          padding: 10px 0 5px 15px;

          .ant-comment-content-author-name > * {
            color: black;
            font-weight: 500;
            font-size: 14px;
          }
        }
        .ant-comment-content-detail {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 0 0 10px 15px;
          font-size: 14px;
        }
        .ant-comment-actions {
          margin-top: 0;
          padding-left: 15px;
          li span {
            padding-right: 23px;
            font-weight: 300;
            font-size: 11px;
            color: black;
          }
        }
        .ant-comment-content-author,
        .ant-comment-content-detail {
          background-color: ${LIGHTER_GRAY};
        }
      }
    }
  }
`;

const NestedComments = ({ comment }) => {
  const nestedComments = (comment.children || []).map((comment) => {
    return <NestedComments comment={comment} key={comment._id} />;
  });
  return (
    <StyledComment
      actions={[
        <span>1w</span>,
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
    </StyledComment>
  );
};

export default NestedComments;
