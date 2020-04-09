import React from "react";
import HeartIcon from "../Icon/heart";
import CommentIcon from "../Icon/comment";
import ShareIcon from "../Icon/share";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default ({
  url,
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
        <HeartIcon className="social-icon-svg" />
        <span>{numLikes}</span>
      </div>
      <div className="social-icon" onClick={setShowComments}>
        <CommentIcon className="social-icon-svg" />
        <span>{numComments}</span>
      </div>
      <div className="social-icon">
        <CopyToClipboard text={url} onCopy={onCopyLink}>
          <span>
            <ShareIcon className="social-icon-svg" />
            <span>{numShares}</span>
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};
