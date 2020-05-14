import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import heart from "assets/icons/heart.svg";
import heartGray from "assets/icons/heart-gray.svg";
import comment from "assets/icons/comment.svg";
import commentGray from "assets/icons/comment-gray.svg";
import share from "assets/icons/share.svg";
import shareGray from "assets/icons/share-gray.svg";

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
      <SvgIcon src={heartGray} className="social-icon-svg" />
    ) : (
      <SvgIcon src={heart} className="social-icon-svg" />
    );
  };

  const renderCommentIcon = () => {
    return showComments ? (
      <SvgIcon src={commentGray} className="social-icon-svg" />
    ) : (
      <SvgIcon src={comment} className="social-icon-svg" />
    );
  };

  const renderShareIcon = () => {
    return shared ? (
      <SvgIcon src={shareGray} className="social-icon-svg" />
    ) : (
      <SvgIcon src={share} className="social-icon-svg" />
    );
  };

  return (
    <div className="social-icons">
      <div className="social-icon" onClick={likePost}>
        {renderLikeIcon()}
        <span className="total-number">{numLikes}</span>
        <span className="social-text">Like</span>
      </div>
      <span></span>
      <div className="social-icon" onClick={setShowComments}>
        {renderCommentIcon()}
        <span className="total-number">{numComments}</span>
        <span className="social-text">Comment</span>
      </div>
      <span></span>
      <div className="social-icon">
        <CopyToClipboard text={url} onCopy={onCopyLink}>
          <span>
            {renderShareIcon()}
            <span className="total-number">{numShares}</span>
            <span className="social-text">Share</span>
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default PostSocial;
