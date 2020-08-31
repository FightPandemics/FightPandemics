// Core
import React, { useEffect } from "react";
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
import mail from "assets/icons/mail.svg";
import { LOGIN } from "templates/RouteWithSubRoutes";

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
  postTitle,
  postContent,
  setShowComments,
  setShowShareModal,
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

  const renderMessageIcon = () => (
    // NOTE: No gray mail icon within assets
    <StyledSvg src={mail} className="social-icon-svg" />
  );

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

  const showNativeShareOrModal = () => {
    if (navigator.canShare) {
      navigator
        .share({
          title: postTitle,
          text: postContent,
          url: `${window.location.origin}/post/${id}`,
        })
        .catch((err) => {
          if (err.name !== "AbortError") console.log(err);
        });
    } else {
      setShowShareModal(true);
    }
  };

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
        <div
          id={gtmTag("share", GTM.post.prefix)}
          className="social-text"
          onClick={showNativeShareOrModal}
        >
          {renderShareIcon()}
          <StyledSpan>Share</StyledSpan>
        </div>
      </div>

      <span></span>
      {/* NOTE: May need new function to trigger message sending feature on click */}
      {postId ? (
        <div
          id={gtmTag("message", GTM.post.prefix)}
          className="social-icon hide-feature"
        >
          {renderMessageIcon()}
          {renderLabels("Message")}
        </div>
      ) : (
        <>
          {/* NOTE: Update pathname and state when message submission page story is ready */}
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
              {/* NOTE: May need new function to trigger message sending feature on click */}
              <div
                id={gtmTag("message", GTM.feed.prefix)}
                className="social-icon hide-feature"
              >
                {renderMessageIcon()}
                {renderLabels("Message")}
              </div>
            </Link>
          ) : (
            <Link
              onClick={() =>
                // NOTE: Update sessionStorage, if necessary
                sessionStorage.setItem("postredirect", `/post/${id}`)
              }
              to={{
                pathname: LOGIN,
                state: { from: window.location.href },
              }}
            >
              <div
                id={gtmTag("icon", GTM.feed.prefix)}
                className="social-icon hide-feature"
              >
                {renderMessageIcon()}
                {renderLabels("Message")}
              </div>
            </Link>
          )}
        </>
      )}
    </>
  );
  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

export default PostSocial;
