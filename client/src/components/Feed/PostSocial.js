import React from "react";
import HeartIcon from "../Icon/heart";
import HeartGrayIcon from "../Icon/heart-gray";
import CommentIcon from "../Icon/comment";
import CommentGrayIcon from "../Icon/comment-gray";
import ShareIcon from "../Icon/share";
import ShareGrayIcon from "../Icon/share-gray";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PostSocial = ({
  url,
  liked,
  shared,
  showComments,
  numLikes,
  numComments,
  numShares,
  onCopyLink,
  setShowComments,
  likePost,
}) => {
  const renderLikeIcon = () => {
    return liked ? (
      <HeartGrayIcon className="social-icon-svg" />
    ) : (
      <HeartIcon className="social-icon-svg" />
    );
  };

  const renderCommentIcon = () => {
    return showComments ? (
      <CommentGrayIcon className="social-icon-svg" />
    ) : (
      <CommentIcon className="social-icon-svg" />
    );
  };

  const renderShareIcon = () => {
    return shared ? (
      <ShareGrayIcon className="social-icon-svg" />
    ) : (
      <ShareIcon className="social-icon-svg" />
    );
  };

  return (
    <div className="social-icons">
      <div className="social-icon" onClick={likePost}>
        {renderLikeIcon()}
        <span>{numLikes}</span>
      </div>
      <span></span>
      <div className="social-icon" onClick={setShowComments}>
        {renderCommentIcon()}
        <span>{numComments}</span>
      </div>
      <span></span>
      <div className="social-icon">
        <CopyToClipboard text={url} onCopy={onCopyLink}>
          <span>
            {renderShareIcon()}
            <span>{numShares}</span>
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default PostSocial;
