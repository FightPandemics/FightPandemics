// Core
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Modal as WebModal } from "antd";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, WhiteSpace } from "antd-mobile";
import { Tooltip, Divider } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Local
import AutoSize from "components/Input/AutoSize";
import Comments from "./Comments";
import FilterTag from "components/Tag/FilterTag";
import Heading from "components/Typography/Heading";
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import SubMenuButton from "components/Button/SubMenuButton";
import WizardFormNav, {
  StyledButtonWizard,
} from "components/StepWizard/WizardFormNav";
import { StyledLoadMoreButton } from "./StyledCommentButton";
import { StyledPostPagePostCard } from "./StyledPostPage";
import {
  typeToTag,
  translateISOTimeTitle,
} from "assets/data/formToPostMappings";
import filterOptions from "assets/data/filterOptions";
import { getOptionText, highlightSearchRegex } from "components/Feed/utils";
import {
  RESET_PAGE,
  NEXT_PAGE,
  SET_COMMENTS,
  SET_LOADING,
  RESET_LOADING,
  TOGGLE_SHOW_COMMENTS,
  TOGGLE_COMMENTS,
} from "hooks/actions/postActions";
import { authorProfileLink } from "./utils";
import { isAuthorOrg, isAuthorUser } from "pages/Feed";
import { ExternalLinkIcon, IconsContainer } from "./ExternalLinks";
import GTM from "constants/gtm-tags";
import { selectActorId } from "reducers/session";

// Icons
import websiteIcon from "assets/icons/social-website-blue.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import {
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";

const URLS = {
  // playStore: [""], // TODO: add once design is done
  // appStore: [""],
  website: [websiteIcon],
  email: [envelopeBlue],
};

export const AntDivider = styled(Divider)`
  height: 100%;

  border-left: 2px solid rgba(0, 0, 0, 0.5);

  left: 75px;
  margin: -2rem 0 -2rem 0;
`;
export const LeftHeader = styled.p`
  padding: 0;

  top: 50%;

  margin: -2rem 0 0 -1rem;
  position: absolute;
  vertical-align: middle;
`;

const filters = Object.values(filterOptions);

const Highlight = ({ text = "", highlight = "" }) => {
  if (!highlight || !highlight.trim()) {
    return text;
  }
  const regex = highlightSearchRegex(highlight);
  const parts = text.split(regex);
  return parts
    .filter((part) => part)
    .map((part) =>
      regex.test(part) ? <span className={"highlighted"}>{part}</span> : part,
    );
};

export const CONTENT_LENGTH = 120;
const Post = ({
  currentPost,
  deleteModalVisibility,
  dispatchPostAction,
  postDispatch,
  fullPostLength,
  handleCancelPostDelete,
  handleCommentDelete,
  highlightWords,
  includeProfileLink,
  isAuthenticated,
  numComments,
  onSelect,
  onChange,
  postDelete,
  showComments,
  user,
  gtmPrefix,
  keepScrollIndex,
  keepPageState,
  keepPostsState,
}) => {
  const { t } = useTranslation();
  const { postId } = useParams();
  const limit = useRef(5);
  let post;
  if (currentPost) {
    post = currentPost;
  }

  const {
    _id,
    content,
    title,
    comments,
    commentsCount,
    externalLinks = {},
    isLoading,
    loadMoreComments,
    page,
  } = post || {};

  const gtmTag = (element, prefix) => prefix + GTM.post[element] + "_" + _id;
  const [toDelete, setToDelete] = useState("");
  const [comment, setComment] = useState([]);
  const actorId = useSelector(selectActorId);

  const setShowComments = () => {
    if (dispatchPostAction) {
      dispatchPostAction(TOGGLE_SHOW_COMMENTS);
    }
  };

  const loadComments = async () => {
    if (commentsCount !== 0) {
      dispatchPostAction(NEXT_PAGE);
    } else {
      dispatchPostAction(NEXT_PAGE);
    }

    let response;
    let commentCountRes;
    let previousComments = [...comments];
    const skip = 0;
    const endPoint = `/api/posts/${postId}/comments?limit=${
      limit.current * page
    }&skip=${skip}`;
    const totalCommentCountEndPoint = `/api/posts/${postId}`;

    dispatchPostAction(SET_LOADING);

    try {
      response = await axios.get(endPoint);
      commentCountRes = await axios.get(totalCommentCountEndPoint);
    } catch (error) {
      console.log({ error });
      dispatchPostAction(RESET_LOADING);
    }
    if (response && response.data) {
      const currentComments = response.data;
      let allComments;
      if (comments) {
        allComments = [...comments, ...currentComments];
      } else {
        allComments = currentComments;
      }

      allComments = allComments.filter(
        (comment1, index, self) =>
          index === self.findIndex((comment2) => comment2._id === comment1._id),
      );
      if (
        previousComments.length === allComments.length ||
        allComments.length === commentsCount
      ) {
        dispatchPostAction(TOGGLE_COMMENTS);
      }
      if (previousComments.length !== allComments.length) {
        dispatchPostAction(
          SET_COMMENTS,
          "comments",
          allComments,
          "numComments",
          commentCountRes.data.numComments,
        );
      }

      dispatchPostAction(RESET_LOADING);
    } else {
      dispatchPostAction(RESET_LOADING);
      dispatchPostAction(RESET_PAGE);
    }
    const currentLimit = limit.current;
    limit.current = currentLimit * page;
  };

  const showLessComments = () => {
    comments.splice(5);
    dispatchPostAction(RESET_PAGE);
    dispatchPostAction(TOGGLE_COMMENTS);
  };

  useEffect(() => {
    if (postId) {
      loadComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = async (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    let response;
    let commentCountRes;
    const postId = post._id;
    const endPoint = `/api/posts/${postId}/comments`;
    const totalCommentCountEndPoint = `/api/posts/${postId}`;
    const newComment = {
      actorId,
      content: comment,
    };

    try {
      response = await axios.post(endPoint, newComment);
      commentCountRes = await axios.get(totalCommentCountEndPoint);
    } catch (error) {
      console.log({ error });
      setComment([]);
    }

    if (response && response.data) {
      const currentComment = response.data;
      const allComments = [currentComment, ...comments];
      await dispatchPostAction(
        SET_COMMENTS,
        "comments",
        allComments,
        "numComments",
        commentCountRes.data.numComments,
      );
      setComment([]);
    }
  };

  const handleDeleteComment = async (comment) => {
    setComment(comment);
    handleCommentDelete();
  };

  const handleDelete = () => {
    setToDelete(post._id);
    onChange();
  };

  const handleDeleteOk = () => {
    if (deleteModalVisibility === DELETE_MODAL_POST) {
      postDelete(post);
    }

    setToDelete("");
    handleCancelPostDelete();
  };

  const renderExternalLinks = () => {
    return Object.entries(externalLinks).map(([name, url]) => {
      return (
        url && (
          <a
            href={name === "email" ? `mailto:${url}` : url}
            key={name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon src={URLS[name]} alt={name} />
          </a>
        )
      );
    });
  };

  const ViewMore = () => (
    <Card.Body className="view-more-wrapper">
      {postId && isAuthenticated ? (
        <div onClick={() => setShowComplete(!showComplete)}>
          {showComplete ? (
            <>
              <IconsContainer>{renderExternalLinks()}</IconsContainer>
              <span className="view-more">{t("post.viewLess")}</span>
            </>
          ) : (
            <span
              id={GTM.post.prefix + GTM.post.viewMore}
              className="view-more"
            >
              {t("post.viewMore")}
            </span>
          )}
        </div>
      ) : (
        <span id={gtmTag("viewMore", GTM.feed.prefix)} className="view-more">
          {t("post.viewMore")}
        </span>
      )}
    </Card.Body>
  );

  const RenderViewMore = () => {
    return !postId && post ? (
      <Link
        to={{
          pathname: `/post/${post._id}`,
          state: {
            post: post,
            postId: post._id,
            from: window.location.href,
            user,
            keepScrollIndex,
            keepPageState,
            keepPostsState,
          },
        }}
      >
        <ViewMore />
      </Link>
    ) : (
      <ViewMore loadContent={showComplete} />
    );
  };

  const renderHeader = (
    <Card.Header
      title={
        <div className="title-wrapper">
          <span className="author">
            <Highlight text={post?.author?.name} highlight={highlightWords} />
          </span>
          <span className="timestamp">
            <Highlight
              text={`Posted at ${translateISOTimeTitle(post.createdAt)}`}
            />
          </span>
          <span className="reporter">
            <Highlight text={`Reported By `} />
          </span>
        </div>
      }
    />
  );

  const renderHeaderWithLink = (
    <Link to={authorProfileLink(post)}>{renderHeader}</Link>
  );

  const renderTags = (
    <Card.Body>
      {post?.types &&
        post?.types.map((tag, idx) => (
          <FilterTag key={idx} disabled={true} selected={false}>
            {t(getOptionText(filters, "type", typeToTag(tag)))}
          </FilterTag>
        ))}
    </Card.Body>
  );

  const renderComments = (
    <Card.Body
      className={`comments-wrapper ${showComments ? "show-comments" : ""}`}
    >
      <AutoSize
        gtmTag={`${GTM.post.prefix}${GTM.post.writeComment}_${postId}`}
        placeholder={t("comment.writeAComment")}
        onPressEnter={handleComment}
        onChange={handleOnChange}
        value={typeof comment === "string" && comment}
      />
      )
      <>
        <Comments
          comments={comments}
          handleOnChange={handleOnChange}
          deleteComment={handleDeleteComment}
          dispatchPostAction={dispatchPostAction}
          user={user}
        />
        {commentsCount > 5 &&
          (loadMoreComments ? (
            <StyledLoadMoreButton disabled={isLoading} onClick={loadComments}>
              {isLoading ? t("comment.loading") : t("comment.showMore")}
            </StyledLoadMoreButton>
          ) : (
            <StyledLoadMoreButton
              disabled={isLoading}
              onClick={showLessComments}
            >
              {isLoading ? t("comment.loading") : t("comment.showLess")}
            </StyledLoadMoreButton>
          ))}
      </>
    </Card.Body>
  );

  const renderSocialIcons = (
    <Card.Body className="content-wrapper">
      <PostSocial
        postDispatch={postDispatch}
        url={window.location.href}
        liked={post?.liked}
        postAuthorName={post.author.name}
        postAuthorAvatar={post.author.photo}
        isOwnPost={
          isAuthorUser(user, post) ||
          isAuthorOrg(user?.organisations, post.author)
        }
        authorId={post.author.id}
        postTitle={post?.title}
        postContent={post?.content}
        showComments={showComments}
        numLikes={post?.likesCount}
        numComments={numComments}
        isAuthenticated={isAuthenticated}
        setShowComments={setShowComments}
        id={post?._id}
        user={user}
        gtmPrefix={gtmPrefix || (postId ? GTM.post.prefix : GTM.feed.prefix)}
        postInfo={{
          objective: post.objective,
          tags: post.types,
          location: post.author.location,
        }}
      />
    </Card.Body>
  );

  const [showComplete, setShowComplete] = useState(true);

  return (
    <>
      {postId && dispatchPostAction ? (
        //Post in post's page.
        <>
          <StyledPostPagePostCard>
            <div className="card-header">
              {includeProfileLink ? renderHeaderWithLink : renderHeader}
              <div className="card-submenu">
                {actorId === post.author.id && (
                  <SubMenuButton
                    onSelect={onSelect}
                    onChange={onChange}
                    postId={postId}
                    post={post}
                    user={user}
                  />
                )}
              </div>
            </div>
            <WhiteSpace size="md" />
            {renderTags}
            <WhiteSpace />
            {renderContent(title, content, highlightWords, showComplete)}
            {fullPostLength > CONTENT_LENGTH ? (
              <RenderViewMore />
            ) : (
              <Card.Body className="view-more-wrapper">
                {renderExternalLinks()}
              </Card.Body>
            )}

            {renderComments}
            <WebModal
              title={t("post.confirm")}
              visible={
                !!deleteModalVisibility &&
                deleteModalVisibility !== DELETE_MODAL_HIDE
              }
              onOk={() => handleDeleteOk()}
              onCancel={handleCancelPostDelete}
              okText={t("post.delete")}
              cancelText={t("post.cancel")}
            >
              {(deleteModalVisibility === DELETE_MODAL_POST && (
                <p>{t("post.deletePostConfirmation")}</p>
              )) || <p>{t("post.deleteCommentConfirmation")}</p>}
            </WebModal>
          </StyledPostPagePostCard>
          <StyledButtonWizard
            nav={<WizardFormNav gtmPrefix={GTM.post.prefix} />}
          />
        </>
      ) : (
        //Post in feed.
        <PostCard>
          <LeftHeader>Something</LeftHeader>

          <AntDivider type="vertical" plain>
            <div className="card-header">
              {includeProfileLink ? renderHeaderWithLink : renderHeader}
              <div className="card-submenu">
                {actorId === post.author.id ? (
                  <SubMenuButton
                    onChange={handleDelete}
                    onSelect={onSelect}
                    post={post}
                    user={user}
                    postId={postId}
                  />
                ) : null}
              </div>
            </div>
            <WhiteSpace size="md" />
            {renderTags}
            <WhiteSpace />
            {post ? (
              <Link
                to={{
                  pathname: `/post/${_id}`,
                  state: {
                    post: post,
                    postId: _id,
                    from: window.location.href,
                    user,
                    keepScrollIndex,
                    keepPageState,
                    keepPostsState,
                  },
                }}
              >
                {renderContent(title, content, highlightWords, showComplete)}
              </Link>
            ) : (
              <>
                {/*
                Include hidden link for meta crawler but not on
                profiles to avoid duplicate crawling of same posts
              */}
                {includeProfileLink && (
                  <Link to={`/post/${_id}`} style={{ display: "none" }}></Link>
                )}
                {renderContent(title, content, highlightWords, showComplete)}
              </>
            )}
            {fullPostLength > CONTENT_LENGTH ||
              (post?.content?.length > CONTENT_LENGTH ? (
                <RenderViewMore />
              ) : (
                <Card.Body className="view-more-wrapper" />
              ))}
            {renderSocialIcons}
            <WebModal
              title={t("post.confirm")}
              visible={
                !!deleteModalVisibility &&
                deleteModalVisibility !== DELETE_MODAL_HIDE &&
                toDelete === post._id
              }
              onOk={() => handleDeleteOk()}
              onCancel={handleCancelPostDelete}
              okText={t("post.delete")}
              cancelText={t("post.cancel")}
            >
              {deleteModalVisibility === DELETE_MODAL_POST ? (
                <p>{t("post.deletePostConfirmation")}</p>
              ) : (
                <p>{t("post.deleteCommentConfirmation")}</p>
              )}
            </WebModal>
          </AntDivider>
        </PostCard>
      )}
    </>
  );
};

const renderContent = (title, content, highlightWords, showComplete) => {
  let finalContent = content;
  if (finalContent.length > CONTENT_LENGTH && !showComplete) {
    finalContent = `${finalContent.substring(0, CONTENT_LENGTH)} . . .`;
  }
  return (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        <Highlight text={title} highlight={highlightWords} />
      </Heading>
      <p className="post-description">
        <Highlight text={finalContent} highlight={highlightWords} />
      </p>
    </Card.Body>
  );
};

export default Post;
