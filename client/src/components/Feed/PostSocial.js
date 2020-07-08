// Core
import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

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

const PostSocial = ({
  handlePostLike,
  isAuthenticated,
  url,
  liked,
  shared,
  showComments,
  numLikes,
  numComments,
  numShares,
  onCopyLink,
  postId,
  setShowComments,
  id,
}) => {
  useEffect(() => {
    const likePost = sessionStorage.getItem("likePost");

    if (id === likePost) {
      if (likePost) {
        handlePostLike(likePost, liked);
      }
    }
  }, [id, liked, handlePostLike]);

  const renderLikeIcon = () => {
    return liked ? (
      <SvgIcon src={heart} className="social-icon-svg" />
    ) : (
      <SvgIcon src={heartGray} className="social-icon-svg" />
    );
  };

  const renderCommentIcon = () => {
    return showComments || numComments > 0 ? (
      <SvgIcon src={comment} className="social-icon-svg" />
    ) : (
      <SvgIcon src={commentGray} className="social-icon-svg" />
    );
  };

  const renderShareIcon = () => {
    return shared ? (
      <SvgIcon src={share} className="social-icon-svg" />
    ) : (
      <SvgIcon src={shareGray} className="social-icon-svg" />
    );
  };

  const gtmTag = (element) =>
    GTM.post.prefix + GTM.post[element] + "_" + postId;

  const renderPostSocialIcons = (
    <>
      {postId ? (
        <div id={gtmTag("like")} className="social-icon">
          {renderLikeIcon()}
          <span className="total-number">{numLikes}</span>
          <span className="social-text">
            {numLikes > 1 ? " Likes" : " Like"}
          </span>
        </div>
      ) : (
        <div
          id={gtmTag("like")}
          className="social-icon"
          onClick={() => handlePostLike(id, liked)}
        >
          {renderLikeIcon()}
          <span className="total-number">{numLikes}</span>
          <span className="social-text">
            {numLikes > 1 ? " Likes" : " Like"}
          </span>
        </div>
      )}
      <span></span>
      {postId ? (
        <div
          id={gtmTag("comment")}
          className="social-icon"
          onClick={setShowComments}
        >
          {renderCommentIcon()}
          <div className="total-number">{numComments}</div>
          <span className="social-text">
            {numComments > 1 ? " Comments" : " Comment"}
          </span>
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
                id={gtmTag("comment")}
                className="social-icon"
                onClick={setShowComments}
              >
                {renderCommentIcon()}
                <div className="total-number">{numComments}</div>
                <span className="social-text">
                  {numComments > 1 ? " Comments" : " Comment"}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              onClick={() =>
                sessionStorage.setItem("postcomment", `/post/${id}`)
              }
              to={{
                pathname: LOGIN,
                state: { from: window.location.href },
              }}
            >
              <div id={gtmTag("comment")} className="social-icon">
                {renderCommentIcon()}
                <div className="total-number">{numComments}</div>
                <span className="social-text">
                  {numComments > 1 ? " Comments" : " Comment"}
                </span>
              </div>
            </Link>
          )}
        </>
      )}

      <span></span>
      <div id={gtmTag("share")} className="social-icon">
        {!postId ? (
          <CopyToClipboard
            text={window.location.href.replace(
              window.location.pathname,
              `/post/${id}`,
            )}
            onCopy={onCopyLink}
          >
            <span>
              {renderShareIcon()}
              <span className="social-text">Share</span>
            </span>
          </CopyToClipboard>
        ) : (
          <CopyToClipboard text={url} onCopy={onCopyLink}>
            <span>
              {renderShareIcon()}
              <span className="social-text">Share</span>
            </span>
          </CopyToClipboard>
        )}
      </div>
    </>
  );

  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

export default PostSocial;
