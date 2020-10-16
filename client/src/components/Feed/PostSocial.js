// Core
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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
  pointer-events: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const PostSocial = ({
  handlePostLike,
  isAuthenticated,
  liked,
  shared,
  showComments,
  numLikes,
  numComments,
  postId,
  postTitle,
  postContent,
  setShowComments,
  setShowShareModal,
  id,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    const likePost = sessionStorage.getItem("likePost");

    if (id === likePost) {
      if (likePost) {
        handlePostLike(likePost, liked, false);
      }
    }
  }, [id, liked, handlePostLike]);

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
          {renderLikeIcon(liked)}
          {renderLabels("Like", numLikes, t)}
        </div>
      ) : (
          <div
            id={gtmTag("like", GTM.feed.prefix)}
            className="social-icon"
            onClick={() => handlePostLike(id, liked, true)}
          >
            {renderLikeIcon(liked)}
            {renderLabels("Like", numLikes, t)}
          </div>
        )}
      <span></span>
      {postId ? (
        <div
          id={gtmTag("comment", GTM.post.prefix)}
          className="social-icon"
          onClick={setShowComments}
        >
          {renderCommentIcon(showComments, numComments)}
          {renderLabels("Comment", numComments, t)}
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
                  {renderCommentIcon(showComments, numComments)}
                  {renderLabels("Comment", numComments, t)}
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
                    {renderCommentIcon(showComments, numComments)}
                    {renderLabels("Comment", numComments, t)}
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
          {renderShareIcon(shared)}
          <StyledSpan>{t("post.share")}</StyledSpan>
        </div>
      </div>
    </>
  );
  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

const renderLikeIcon = (liked) => {
  return <StyledSvg src={liked ? heart : heartGray} className="social-icon-svg" />;
};

const renderCommentIcon = (showComments, numComments) => {
  return <StyledSvg src={(showComments || numComments > 0) ? comment : commentGray} className="social-icon-svg" />
};

const renderShareIcon = (shared) => {
  return <StyledSvg src={shared ? share : shareGray} className="social-icon-svg" />
};

const renderLabels = (label, count, t) => {
  return (
    <>
      <StyledSpan className="total-number">
        {label === "Comment"
          ? t("comment.commentWithCount", { count })
          : t("post.likeWithCount", { count })}
      </StyledSpan>
    </>
  );
};

export default PostSocial;
