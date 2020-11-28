import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { colors } = theme;

const ReportedPlaceHolder = styled.div`
  height: calc(100% - 4rem);
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
    background: ${colors.gray};
    border-radius: 20px;
    color: ${colors.darkGray};
  }
`;

const PostPlaceHolder = () => (
  <ReportedPlaceHolder>
    <p>
      You have reported this post. It will no longer be visible on your feed.
    </p>
  </ReportedPlaceHolder>
);
export default PostPlaceHolder;
