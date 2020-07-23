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

// Constants
import { mq } from "constants/theme";

const StyledSvg = styled(SvgIcon)`
  pointer-events: none;
`;

const StyledSpan = styled.span`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
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
  setShowSocial,
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

  const renderLabels = (label, labelCountProp) => {
    return (
      <>
        <StyledSpan className="total-number">{labelCountProp}</StyledSpan>
        <StyledSpan className="social-text">
          {labelCountProp > 1 ? ` ${label}s` : ` ${label}`}
        </StyledSpan>
      </>
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
          {renderLabels("Like", numLikes)}
        </div>
      ) : (
        <div
          id={gtmTag("like", GTM.feed.prefix)}
          className="social-icon"
          onClick={() => handlePostLike(id, liked, true)}
        >
          {renderLikeIcon()}
          {renderLabels("Like", numLikes)}
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
          {renderLabels("Comment", numComments)}
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
                {renderLabels("Comment", numComments)}
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
                {renderLabels("Comment", numComments)}
              </div>
            </Link>
          )}
        </>
      )}

      <span></span>

      <div className="social-icon">
        <span>
          {renderShareIcon()}
          <StyledSpan
            id={gtmTag("share", GTM.post.prefix)}
            className="social-text"
            onClick={() => setShowSocial(true)}
          >
            Share
          </StyledSpan>
        </span>
      </div>
    </>
  );
  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

export default PostSocial;
