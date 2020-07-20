// Core
import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Local
// import { FeedContext } from "pages/Feed.js";
import GTM from "constants/gtm-tags";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import heart from "assets/icons/heart.svg";
import heartGray from "assets/icons/heart-gray.svg";
import comment from "assets/icons/comment.svg";
import commentGray from "assets/icons/comment-gray.svg";
import share from "assets/icons/share.svg";
import shareGray from "assets/icons/share-gray.svg";
import { LOGIN } from "templates/RouteWithSubRoutes";

const StyledSvg = styled(SvgIcon)`
  pointer-events: none;
`;

const StyledSpan = styled.span`
  pointer-events: none;
`;

const PostSocial = ({
  handlePostLike,
  isAuthenticated,
  url,
  liked,
  shared,
  showComments,
  numLikes,
  numComments,
  onCopyLink,
  postId,
  setShowComments,
  id,
}) => {
  useEffect(() => {
    const likePost = sessionStorage.getItem("likePost");

    if (id === likePost) {
      if (likePost) {
        handlePostLike(likePost, liked, false);
      }
    }
  }, [id, liked, handlePostLike]);

  const renderLikeIcon = () => {
    return liked ? (
      <StyledSvg src={heart} className="social-icon-svg" />
    ) : (
      <StyledSvg src={heartGray} className="social-icon-svg" />
    );
  };

  const renderCommentIcon = () => {
    return showComments || numComments > 0 ? (
      <StyledSvg src={comment} className="social-icon-svg" />
    ) : (
      <StyledSvg src={commentGray} className="social-icon-svg" />
    );
  };

  const renderShareIcon = () => {
    return shared ? (
      <StyledSvg src={share} className="social-icon-svg" />
    ) : (
      <StyledSvg src={shareGray} className="social-icon-svg" />
    );
  };

  const gtmTag = (element, prefix) => prefix + GTM.post[element] + "_" + id;

  const renderPostSocialIcons = (
    <>
      {postId ? (
        <div
          id={gtmTag("like", GTM.post.prefix)}
          className="social-icon"
          onClick={() => handlePostLike(id, liked, true)}
        >
          {renderLikeIcon()}
          <StyledSpan className="total-number">{numLikes}</StyledSpan>
          <StyledSpan className="social-text">
            {numLikes > 1 ? " Likes" : " Like"}
          </StyledSpan>
        </div>
      ) : (
        <div
          id={gtmTag("like", GTM.feed.prefix)}
          className="social-icon"
          onClick={() => handlePostLike(id, liked, true)}
        >
          {renderLikeIcon()}
          <StyledSpan className="total-number">{numLikes}</StyledSpan>
          <StyledSpan className="social-text">
            {numLikes > 1 ? " Likes" : " Like"}
          </StyledSpan>
        </div>
      )}
      <span></span>
      {postId ? (
        <div
          id={gtmTag("comment", GTM.post.prefix)}
          className="social-icon"
          onClick={setShowComments}
        >
          {renderCommentIcon()}
          <StyledSpan className="total-number">{numComments}</StyledSpan>
          <StyledSpan className="social-text">
            {numComments > 1 ? " Comments" : " Comment"}
          </StyledSpan>
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <Link
              to={{
                pathname: `/post/${id}`,
                state: {
                  postId: id,
                  comments: true,
                  from: window.location.href,
                },
              }}
            >
              <div
                id={gtmTag("comment", GTM.feed.prefix)}
                className="social-icon"
                onClick={setShowComments}
              >
                {renderCommentIcon()}
                <StyledSpan className="total-number">{numComments}</StyledSpan>
                <StyledSpan className="social-text">
                  {numComments > 1 ? " Comments" : " Comment"}
                </StyledSpan>
              </div>
            </Link>
          ) : (
            <Link
              onClick={() =>
                sessionStorage.setItem("postredirect", `/post/${id}`)
              }
              to={{
                pathname: LOGIN,
                state: { from: window.location.href },
              }}
            >
              <div
                id={gtmTag("comment", GTM.feed.prefix)}
                className="social-icon"
              >
                {renderCommentIcon()}
                <StyledSpan className="total-number">{numComments}</StyledSpan>
                <StyledSpan className="social-text">
                  {numComments > 1 ? " Comments" : " Comment"}
                </StyledSpan>
              </div>
            </Link>
          )}
        </>
      )}

      <span></span>

      {postId ? (
        <div className="social-icon">
          <CopyToClipboard
            id={gtmTag("share", GTM.post.prefix)}
            text={url}
            onCopy={onCopyLink}
          >
            <span>
              {renderShareIcon()}
              <StyledSpan className="social-text">Share</StyledSpan>
            </span>
          </CopyToClipboard>
        </div>
      ) : (
        <div className="social-icon">
          <CopyToClipboard
            id={gtmTag("share", GTM.feed.prefix)}
            text={window.location.href.replace(
              window.location.pathname,
              `/post/${id}`,
            )}
            onCopy={onCopyLink}
          >
            <span>
              {renderShareIcon()}
              <StyledSpan className="social-text">Share</StyledSpan>
            </span>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

export default PostSocial;
