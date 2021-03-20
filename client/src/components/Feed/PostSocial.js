// Core
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Local
import GTM from "constants/gtm-tags";
import { selectOrganisationId, selectUser } from "reducers/session";
import { postsActions } from "reducers/posts";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import heartFilled from "assets/icons/heart-filled.svg";
import heartOutline from "assets/icons/heart-outline.svg";
import commentFilled from "assets/icons/comment-filled.svg";
import commentOutline from "assets/icons/comment-outline.svg";
import share from "assets/icons/share.svg";
import { LOGIN } from "templates/RouteWithSubRoutes";

// Constants
import { mq } from "constants/theme";
import MessageModal from "./MessagesModal/MessageModal.js";

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
  isAuthenticated,
  isOwnPost,
  authorId,
  postDispatch,
  liked,
  showComments,
  numLikes,
  commentsCount,
  postAuthorName,
  postAuthorAvatar,
  postId,
  postTitle,
  postContent,
  postInfo,
  setShowComments,
  setShowShareModal,
  id,
  keepScrollIndex,
  keepPageState,
  keepPostsState,
  gtmPrefix,
  post,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const organisationId = useSelector(selectOrganisationId);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const gtmTag = (element, prefix) => prefix + GTM.post[element] + "_" + id;

  if (isOwnPost && sessionStorage.getItem("msgModal") === authorId)
    sessionStorage.removeItem("msgModal");

  const showNativeShareOrModal = () => {
    if (navigator.share) {
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

  const handlePostLike = useCallback(async (post, postId, liked, create) => {
    sessionStorage.removeItem("likePost");

    if (isAuthenticated) {
      const endPoint = `/api/posts/${postId}/likes/${
        organisationId || user?.id || user?._id
      }`;
      if (!user) {
        return;
      }
      const request = liked ? axios.delete : axios.put;
      try {
        const { data } = await request(endPoint);
        postDispatch(
          postsActions.setLikeAction(data.post, data.post.likesCount)
        );
        dispatch(
          postsActions.updateProfilePostSucess({
            post: data.post,
            userId: authorId,
          })
        );
      } catch (error) {
        console.log({ error });
      }
    } else if (create) {
      sessionStorage.setItem("likePost", postId);
      history.push(LOGIN);
    }
  });

  useEffect(() => {
    const likePost = sessionStorage.getItem("likePost");

    if (id === likePost) {
      if (likePost) {
        handlePostLike(post, likePost, liked, false);
      }
    }
  }, [handlePostLike, id, liked]);

  const renderPostSocialIcons = (
    <>
      {postId ? (
        <div
          id={gtmTag("like", GTM.post.prefix)}
          className="social-icon"
          onClick={() => handlePostLike(post, id, liked, true)}
        >
          {renderLikeIcon(liked)}
          {renderLabels("Like", numLikes, t)}
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <div
              id={gtmTag("like", GTM.feed.prefix)}
              className="social-icon"
              onClick={() => handlePostLike(post, id, liked, true)}
            >
              {renderLikeIcon(liked)}
              {renderLabels("Like", numLikes, t)}
            </div>
          ) : (
            <Link
              onClick={() =>
                sessionStorage.setItem("postredirect", `/post/${id}`)
              }
              to={{
                pathname: LOGIN,
                state: {
                  from: window.location.href,
                  keepScrollIndex,
                  keepPageState,
                  keepPostsState,
                },
              }}
            >
              <div id={gtmTag("like", GTM.feed.prefix)} className="social-icon">
                {renderLikeIcon(liked)}
                {renderLabels("Like", numLikes, t)}
              </div>
            </Link>
          )}
        </>
      )}
      <span></span>
      {postId ? (
        <div
          id={gtmTag("comment", GTM.post.prefix)}
          className="social-icon"
          onClick={setShowComments}
        >
          {renderCommentIcon(showComments, commentsCount)}
          {renderLabels("Comment", commentsCount, t)}
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
                  keepScrollIndex,
                  keepPageState,
                  keepPostsState,
                },
              }}
            >
              <div
                id={gtmTag("comment", GTM.feed.prefix)}
                className="social-icon"
                onClick={setShowComments}
              >
                {renderCommentIcon(showComments, commentsCount)}
                {renderLabels("Comment", commentsCount, t)}
              </div>
            </Link>
          ) : (
            <Link
              onClick={() =>
                sessionStorage.setItem("postredirect", `/post/${id}`)
              }
              to={{
                pathname: LOGIN,
                state: {
                  from: window.location.href,
                  keepScrollIndex,
                  keepPageState,
                  keepPostsState,
                },
              }}
            >
              <div
                id={gtmTag("comment", GTM.feed.prefix)}
                className="social-icon"
              >
                {renderCommentIcon(showComments, commentsCount)}
                {renderLabels("Comment", commentsCount, t)}
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
          <StyledSpan>{t("post.share")}</StyledSpan>
        </div>
      </div>
      {!isOwnPost &&
        !/Sourced by FightPandemics\ \(.*?\)/.test(postAuthorName) && (
          <>
            <span></span>
            <div className="social-icon">
              <MessageModal
                isAuthenticated={isAuthenticated}
                title={postTitle}
                postContent={postContent}
                postAuthorName={postAuthorName}
                authorId={authorId}
                postId={id}
                avatar={postAuthorAvatar}
                postInfo={postInfo}
                gtmPrefix={gtmPrefix}
              />
            </div>
          </>
        )}
    </>
  );
  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

const renderLikeIcon = (liked) => {
  return (
    <StyledSvg
      src={liked ? heartFilled : heartOutline}
      className="social-icon-svg"
    />
  );
};

const renderCommentIcon = (showComments, commentsCount) => {
  return (
    <StyledSvg
      src={showComments || commentsCount > 0 ? commentFilled : commentOutline}
      className="social-icon-svg"
    />
  );
};

const renderShareIcon = () => {
  return <StyledSvg src={share} className="social-icon-svg" />;
};

const renderLabels = (label, count, t) => {
  return (
    <>
      <StyledSpan className="number-with-text">
        {label === "Comment"
          ? t("comment.commentWithCount", { count })
          : t("post.likeWithCount", { count })}
      </StyledSpan>
      <StyledSpan className="number-only">{count}</StyledSpan>
    </>
  );
};

export default PostSocial;
