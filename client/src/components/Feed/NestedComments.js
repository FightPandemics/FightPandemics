import React from "react";
import styled from "styled-components";
import { Comment, Avatar } from "antd";
import { LIGHTER_GRAY } from "../../constants/colors";
import HeartSmallIcon from "../Icon/heart-small";

const Likes = styled.div`
  background: #fff;
  position: absolute;
  width: 3.6rem;
  height: 1.7rem;
  font-size: 1.1rem;
  padding-left: 0.5rem;
  border-radius: 0.85rem;
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.06);
  img {
    margin-right: 0.5rem;
  }
`;

const StyledComment = styled(Comment)`
  &.ant-comment {
    .ant-comment-inner {
      padding: 1rem 0;
      .ant-comment-content {
        position: relative;
        max-width: 30rem;
        .ant-comment-content-author {
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
          margin-bottom: 0;
          padding: 1rem 0 0.5rem 1.5rem;
          .ant-comment-content-author-name > * {
            color: black;
            font-weight: 500;
            font-size: 1.4rem;
          }
        }
        .ant-comment-content-detail {
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          padding: 0 1.5rem 1.5rem;
          font-size: 1.4rem;
          line-height: 140%;
        }
        .ant-comment-actions {
          margin-top: 0;
          padding-left: 1.5rem;
          li span {
            padding-right: 2.3rem;
            font-size: 1.1rem;
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
    return (
      <React.Fragment>
        <NestedComments comment={comment} key={comment._id} />
        <Likes key={comment._id}>
          <HeartSmallIcon />
          {comment.numLikes}
        </Likes>
      </React.Fragment>
    );
  });
  return (
    <StyledComment
      actions={[
        <span>1w</span>,
        <span key="comment-basic-like">Like</span>,
        <span key="comment-nested-reply-to">Reply</span>,
      ]}
      author={<span>{comment.name}</span>}
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
