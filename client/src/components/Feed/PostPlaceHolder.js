import React, { useState } from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;

const ReportedPlaceHolder = styled.div`
  margin-bottom: 4rem;
  height: 25rem;
  padding: 2rem;
  border: 0.4px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 2px;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: unset !important;
  }

  p {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    width: 100%;
    margin: auto;
    background: #f6f7fb;
    border-radius: 20px;
    color: #939393;
  }
`;

const SuspuctedPlaceHolder = styled(ReportedPlaceHolder)`
  height: 10rem;
  p {
    background: unset;
    padding: 1rem;
    span {
      width: 128px;
      color: #425af2;
      margin-left: auto;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

const PostPlaceHolder = ({
  postId,
  isReported,
  isHidden,
  isSuspected,
  onPostUnhide,
}) => {
  if (isReported)
    return (
      <ReportedPlaceHolder>
        <p>
          You have reported this post. It will no longer be visible on your
          feed.
        </p>
      </ReportedPlaceHolder>
    );
  if (isSuspected)
    return (
      <SuspuctedPlaceHolder>
        <p>
          This post received multiple reports and has been hidden from the help
          board
          <span>Show post anyway</span>
        </p>
      </SuspuctedPlaceHolder>
    );
  if (isHidden)
    return (
      <SuspuctedPlaceHolder>
        <p>
          You did hide this post, it will not be visible for you.
          <span onClick={() => onPostUnhide(postId)}>Show post anyway</span>
        </p>
      </SuspuctedPlaceHolder>
    );
};
export default PostPlaceHolder;
