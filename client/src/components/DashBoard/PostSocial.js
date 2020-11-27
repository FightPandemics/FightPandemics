// Core
import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import PostRemoval from "assets/icons/post-removal.svg";
import PostApproval from "assets/icons/post-approval.svg";

// Constants
import { mq } from "constants/theme";

const StyledSvg = styled(SvgIcon)`
  pointer-events: none;
`;

const StyledSpan = styled.span`
  pointer-events: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const PostSocial = ({
  isOwnPost,
  authorId,
  liked,
  showComments,
  numLikes,
  numComments,
  setShowComments,
}) => {
  const { t } = useTranslation();

  if (isOwnPost && sessionStorage.getItem("msgModal") === authorId)
    sessionStorage.removeItem("msgModal");

  const renderPostSocialIcons = (
    <>
      <div className="social-icon">
        {renderLikeIcon(liked)}
        {renderLabels("Like", numLikes, t)}
      </div>

      <span></span>

      <div className="social-icon" onClick={setShowComments}>
        {renderCommentIcon(showComments, numComments)}
        {renderLabels("Keep Post", numComments, t)}
      </div>

      <span></span>
    </>
  );
  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

const renderLikeIcon = (liked) => {
  return <StyledSvg src={PostRemoval} className="social-icon-svg" />;
};

const renderCommentIcon = (showComments, numComments) => {
  return <StyledSvg src={PostApproval} className="social-icon-svg" />;
};

const renderLabels = (label, count, t) => {
  return (
    <>
      <StyledSpan className="number-with-text">
        {label === "Keep Post" ? "Keep Post" : "Remove Post"}
      </StyledSpan>
      <StyledSpan className="number-only">{count}</StyledSpan>
    </>
  );
};

export default PostSocial;
