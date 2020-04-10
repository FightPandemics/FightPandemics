import React from "react";
import HeartIcon from "../Icon/heart";
import HeartGrayIcon from "../Icon/heart-gray";
import CommentIcon from "../Icon/comment";
import CommentGrayIcon from "../Icon/comment-gray";
import ShareIcon from "../Icon/share";
import ShareGrayIcon from "../Icon/share-gray";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default ({
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
  return (
    <div className="social-icons">
      <div className="social-icon" onClick={likePost}>
        {liked ? (
          <HeartGrayIcon className="social-icon-svg" />
        ) : (
          <HeartIcon className="social-icon-svg" />
        )}
        <span>{numLikes}</span>
      </div>
      <div className="social-icon" onClick={setShowComments}>
        {showComments ? (
          <CommentGrayIcon className="social-icon-svg" />
        ) : (
          <CommentIcon className="social-icon-svg" />
        )}
        <span>{numComments}</span>
      </div>
      <div className="social-icon">
        <CopyToClipboard text={url} onCopy={onCopyLink}>
          <span>
            {shared ? (
              <ShareGrayIcon className="social-icon-svg" />
            ) : (
              <ShareIcon className="social-icon-svg" />
            )}
            <span>{numShares}</span>
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};
