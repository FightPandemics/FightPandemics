// Core
import React, { useEffect, useState, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, WhiteSpace } from "antd-mobile";
import { Tooltip } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Local
import AutoSize from "components/Input/AutoSize";
import Comments from "./Comments";
import PostTag from "components/Tag/PostTag";
import Heading from "components/Typography/Heading";
import { LOGIN } from "templates/RouteWithSubRoutes";
import PostCard from "./PostCard";
import DeleteModal from "./PostDeleteModal";
import PostSocial from "./PostSocial";
import { ShareModal } from "./PostShare";
import PostDropdownButton from "components/Feed/PostDropdownButton";
import WizardFormNav, {
  StyledButtonWizard,
} from "components/StepWizard/WizardFormNav";
import { StyledLoadMoreButton } from "./StyledCommentButton";
import { StyledPostPagePostCard } from "./StyledPostPage";
import TextAvatar from "components/TextAvatar";
import {
  typeToTag,
  translateISOTimeTitle,
} from "assets/data/formToPostMappings";
import filterOptions from "assets/data/filterOptions";
import CreateReport from "components/CreateReport/CreateReport";
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
import { authorProfileLink, buildLocationString } from "./utils";
import { isAuthorOrg, isAuthorUser } from "pages/Feed";
import { getInitialsFromFullName } from "utils/userInfo";
import { ExternalLinkIcon, IconsContainer } from "./ExternalLinks";
import GTM from "constants/gtm-tags";
import { selectActorId } from "reducers/session";
import PostPlaceHolder from "./PostPlaceHolder";
import { linkify } from "utils/validators";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import eyeHide from "assets/icons/eye-hide.svg";
import {
  DELETE_MODAL_POST,
  DELETE_MODAL_COMMENT,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";
import { postsActions } from "reducers/posts";

const URLS = {
  // playStore: [""], // TODO: add once design is done
  // appStore: [""],
  website: [websiteIcon],
  email: [envelopeBlue],
};

const filters = Object.values(filterOptions);

const highlightString = (text, highlight) => {
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

const Highlight = ({ textObj = "", highlight = "" }) => {
  if (typeof textObj === "string") {
    return highlightString(textObj, highlight);
  }
  // linkify result could be Array
  if (Array.isArray(textObj)) {
    return textObj.map((part) =>
      typeof part === "string" ? highlightString(part, highlight) : part,
    );
  }
  return textObj;
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
  handlePostLike,
  highlightWords,
  includeProfileLink,
  isAuthenticated,
  onSelect,
  onChange,
  postDelete,
  showComments,
  user,
  gtmPrefix,
  keepScrollIndex,
  keepPageState,
  keepPostsState,
  isHidden,
  onPostHide,
  onPostUnhide,
  convertTextToURL,
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
    didReport,
    reportsCount,
    status,
    objective,
  } = post || {};

  const gtmTag = (element, prefix) => prefix + GTM.post[element] + "_" + _id;
  const [showShareModal, setShowShareModal] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const [comment, setComment] = useState([]);
  const [callReport, setCallReport] = useState(false);
  const actorId = useSelector(selectActorId);

  const AvatarName =
    (post?.author?.name && getInitialsFromFullName(post.author.name)) || "";

  const setShowComments = () => {
    if (dispatchPostAction) {
      dispatchPostAction(TOGGLE_SHOW_COMMENTS);
    }
  };

  const onPostShowAnyway = () => {
    postDispatch(postsActions.showAnyway({ postId: post._id }));
  };

  const onPostPageShowAnyway = () => {
    if (dispatchPostAction) {
      postDispatch(postsActions.showAnyway({ postId: post._id }));
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
    const totalCommentCountEndPoint = `/api/posts/${postId}${
      actorId ? `?actorId=${actorId}` : ""
    }`;

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
          "commentsCount",
          commentCountRes.data.post.commentsCount,
        );
      }

      dispatchPostAction(RESET_LOADING);
    } else {
      dispatchPostAction(RESET_LOADING);
      dispatchPostAction(RESET_PAGE);
    }
    const currentLimit = limit.current;
    //limit.current = currentLimit * page;
    limit.current = currentLimit * (page == 1 ? 2 : page); // a workaround to fix above line,
    // when page == 1 not expand any more,
    // to reproduce, use above line, create a post, add 10 comments, toggle show less/more several times
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
    if (e.shiftKey) return;
    e.preventDefault();
    let response;
    let commentCountRes;
    const postId = post._id;
    const endPoint = `/api/posts/${postId}/comments`;
    const totalCommentCountEndPoint = `/api/posts/${postId}${
      actorId ? `?actorId=${actorId}` : ""
    }`;
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
        "commentsCount",
        commentCountRes.data.post.commentsCount,
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
    } else if (deleteModalVisibility === DELETE_MODAL_COMMENT) {
      deleteComment(comment);
    }

    setToDelete("");
    handleCancelPostDelete();
  };

  const deleteComment = async (comment) => {
    let response;
    let commentCountRes;
    const postId = comment.postId;
    const commentId = comment._id;
    if (actorId === comment.author.id) {
      const endPoint = `/api/posts/${postId}/comments/${commentId}`;
      const totalCommentCountEndPoint = `/api/posts/${postId}${
        actorId ? `?actorId=${actorId}` : ""
      }`;

      try {
        response = await axios.delete(endPoint);
        commentCountRes = await axios.get(totalCommentCountEndPoint);
      } catch (error) {
        console.log({ error });
      }
      if (response && response.data) {
        let filterComments = comments.filter(
          (comment) => comment._id !== commentId,
        );

        await dispatchPostAction(
          SET_COMMENTS,
          "comments",
          filterComments,
          "commentsCount",
          commentCountRes.data.post.commentsCount,
        );
      }
    }
  };

  const handleHide = () => {
    onPostHide(_id);
  };

  const handleReport = () => {
    setCallReport(true);
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
    return !postId && post && isAuthenticated ? (
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
      <>
        {isAuthenticated ? (
          <ViewMore loadContent={showComplete} />
        ) : (
          <Link
            onClick={() =>
              sessionStorage.setItem("postredirect", `/post/${post._id}`)
            }
            to={{
              pathname: LOGIN,
              state: { from: window.location.href },
            }}
          >
            <ViewMore loadContent={showComplete} />
          </Link>
        )}
      </>
    );
  };

  const renderHeader = (
    <Card.Header
      title={
        <div className="title-wrapper">
          <span className="author">
            <Highlight
              textObj={post?.author?.name}
              highlight={highlightWords}
            />
          </span>
          <div
            className="sub-header"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {post?.author?.location?.country ? (
              <span className="location-status">
                <SvgIcon src={statusIndicator} className="status-icon" />
                {buildLocationString(post.author.location)}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      }
      thumb={
        post?.author?.photo ? (
          post.author.photo
        ) : (
          <TextAvatar>{AvatarName}</TextAvatar>
        )
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
          <PostTag key={idx} disabled={true} selected={false}>
            {t(getOptionText(filters, "type", typeToTag(tag)))}
          </PostTag>
        ))}
    </Card.Body>
  );

  const renderComments = (
    <Card.Body
      className={`comments-wrapper ${showComments ? "show-comments" : ""}`}
    >
      {isAuthenticated ? (
        <AutoSize
          gtmTag={`${GTM.post.prefix}${GTM.post.writeComment}_${postId}`}
          placeholder={t("comment.writeAComment")}
          onPressEnter={handleComment}
          onChange={handleOnChange}
          value={typeof comment === "string" && comment}
          maxLength={2048}
        />
      ) : (
        <div>{t("comment.onlyAuthenticated")}</div>
      )}
      {isAuthenticated ? (
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
      ) : (
        ""
      )}
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
        commentsCount={commentsCount}
        isAuthenticated={isAuthenticated}
        setShowComments={setShowComments}
        setShowShareModal={setShowShareModal}
        id={post?._id}
        keepScrollIndex={keepScrollIndex}
        keepPageState={keepPageState}
        keepPostsState={keepPostsState}
        user={user}
        gtmPrefix={gtmPrefix || (postId ? GTM.post.prefix : GTM.feed.prefix)}
        postInfo={{
          objective: post.objective,
          tags: post.types,
          location: post.author.location,
          age: Object.values(post?.elapsedTimeText?.created || {}).join(" "),
        }}
      />
    </Card.Body>
  );

  const [showComplete, setShowComplete] = useState(true);
  const isSuspected = status === "flagged" && reportsCount >= 5;
  const isOwner =
    isAuthenticated &&
    (isAuthorUser(user, post) || isAuthorOrg(user?.organisations, post.author));

  return (
    <>
      {postId && dispatchPostAction ? (
        //Post in post's page.
        <>
          <StyledPostPagePostCard>
            {!isOwner && isSuspected && (
              <div className="blur-overlay">
                <SvgIcon src={eyeHide} />
                {t("moderation.postSuspected")}
                {/* removed for now
                <span onClick={() => onPostPageShowAnyway(postId)}>
                  {t("moderation.showAnyway")}
                </span>
                */}
              </div>
            )}
            <div className="pre-header post-page">
              <span>{t(`feed.${objective}`)}&nbsp;&nbsp;•</span>
              <Tooltip title={translateISOTimeTitle(post.createdAt)}>
                <span className="timestamp">
                  {t(
                    `relativeTime.${post?.elapsedTimeText?.created?.unit}WithCount`,
                    {
                      count: post?.elapsedTimeText?.created?.count,
                    },
                  )}
                  {post?.elapsedTimeText?.isEdited && ` · ${t("post.edited")}`}
                </span>
              </Tooltip>
            </div>
            <WhiteSpace size={"sm"} />
            <div className="card-header">
              {includeProfileLink ? renderHeaderWithLink : renderHeader}
              {isAuthenticated && (
                <div className="card-submenu">
                  <PostDropdownButton
                    onHide={handleHide}
                    onReport={handleReport}
                    onEdit={onSelect}
                    onDelete={handleDelete}
                    fromPage={true}
                    post={post}
                    user={user}
                    postId={postId}
                    isSelf={isAuthenticated && actorId === post.author.id}
                    isOwner={
                      isAuthenticated &&
                      (isAuthorUser(user, post) ||
                        isAuthorOrg(user?.organisations, post.author))
                    }
                  />
                </div>
              )}
            </div>
            <WhiteSpace size="md" />
            {renderTags}
            {renderContent(title, content, highlightWords, showComplete, convertTextToURL)}
            {fullPostLength > CONTENT_LENGTH ? (
              <RenderViewMore />
            ) : (
              <Card.Body className="view-more-wrapper">
                {renderExternalLinks()}
              </Card.Body>
            )}
            {renderSocialIcons}
            <ShareModal
              showShareModal={showShareModal}
              setShowShareModal={setShowShareModal}
              id={post._id}
              postTitle={post.title}
              postContent={post.content}
            />
            {renderComments}
            <DeleteModal
              title={
                (deleteModalVisibility === DELETE_MODAL_POST && (
                  <p>{t("post.deletePostConfirmationTitle")}</p>
                )) || <p>{t("post.deleteCommentConfirmationTitle")}</p>
              }
              visible={
                !!deleteModalVisibility &&
                deleteModalVisibility !== DELETE_MODAL_HIDE
              }
              onOk={() => handleDeleteOk()}
              onCancel={handleCancelPostDelete}
              okText={t("post.deleteConfirmation")}
              cancelText={t("post.cancel")}
              okButtonProps={{
                id:
                  deleteModalVisibility === DELETE_MODAL_POST
                    ? GTM.post.prefix + GTM.post.delete
                    : "",
              }}
            >
              {(deleteModalVisibility === DELETE_MODAL_POST && (
                <p>{t("post.deletePostConfirmation")}</p>
              )) || <p>{t("post.deleteCommentConfirmation")}</p>}
            </DeleteModal>
            {callReport ? (
              <CreateReport
                callReport={callReport}
                setCallReport={setCallReport}
                postId={post._id}
                fromPage={true}
              />
            ) : null}
          </StyledPostPagePostCard>
          <StyledButtonWizard
            nav={<WizardFormNav gtmPrefix={GTM.post.prefix} />}
          />
        </>
      ) : (
        //Post in feed.
        <>
          {didReport ? (
            <PostPlaceHolder />
          ) : (
            <PostCard unClickable={!isOwner && (isSuspected || isHidden)}>
              {!isOwner && (isHidden || isSuspected) && (
                <div className="blur-overlay">
                  <SvgIcon src={eyeHide} />
                  {isHidden && !isSuspected && (
                    <>
                      {t("moderation.postHidden")}
                      <span
                        id={GTM.post.prefix + GTM.moderation.unhide}
                        onClick={() => onPostUnhide(_id)}
                      >
                        {t("moderation.unhide")}
                      </span>
                    </>
                  )}
                  {isSuspected && !isOwner && (
                    <>
                      {t("moderation.postSuspected")}
                      {/* removed for now
                      <span onClick={() => onPostShowAnyway(_id)}>
                        {t("moderation.showAnyway")}
                      </span>
                      */}
                    </>
                  )}
                </div>
              )}
              <div className="pre-header">
                <span>{t(`feed.${objective}`)}&nbsp;&nbsp;•</span>
                <Tooltip title={translateISOTimeTitle(post.createdAt)}>
                  <span className="timestamp">
                    {t(
                      `relativeTime.${post?.elapsedTimeText?.created?.unit}WithCount`,
                      {
                        count: post?.elapsedTimeText?.created?.count,
                      },
                    )}
                    {post?.elapsedTimeText?.isEdited &&
                      ` · ${t("post.edited")}`}
                  </span>
                </Tooltip>
              </div>
              <WhiteSpace size={"xl"} />
              <WhiteSpace size={"md"} />
              <div className="card-header">
                {includeProfileLink ? renderHeaderWithLink : renderHeader}
                {isAuthenticated && (
                  <div className="card-submenu">
                    <PostDropdownButton
                      onHide={handleHide}
                      onReport={handleReport}
                      onEdit={onSelect}
                      onDelete={handleDelete}
                      post={post}
                      user={user}
                      postId={postId}
                      isSelf={isAuthenticated && actorId === post.author.id}
                      isOwner={isOwner}
                    />
                  </div>
                )}
              </div>
              <WhiteSpace size="md" />
              {renderTags}
              <WhiteSpace />
              {post && isAuthenticated ? (
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
                  {renderContent(title, content, highlightWords, showComplete, convertTextToURL)}
                </Link>
              ) : (
                <>
                  {/*
                Include hidden link for meta crawler but not on
                profiles to avoid duplicate crawling of same posts
              */}
                  {includeProfileLink && (
                    <Link
                      to={`/post/${_id}`}
                      style={{ display: "none" }}
                    ></Link>
                  )}
                  {renderContent(title, content, highlightWords, showComplete, convertTextToURL)}
                </>
              )}
              {fullPostLength > CONTENT_LENGTH ||
                (post?.content?.length > CONTENT_LENGTH ? (
                  <RenderViewMore />
                ) : (
                  <Card.Body className="view-more-wrapper" />
                ))}
              {renderSocialIcons}
              <ShareModal
                showShareModal={showShareModal}
                setShowShareModal={setShowShareModal}
                id={post._id}
                postTitle={post.title}
                postContent={post.content}
              />
              <DeleteModal
                title={<p>{t("post.deletePostConfirmationTitle")}</p>}
                visible={
                  !!deleteModalVisibility &&
                  deleteModalVisibility !== DELETE_MODAL_HIDE &&
                  toDelete === post._id
                }
                onOk={() => handleDeleteOk()}
                onCancel={handleCancelPostDelete}
                okText={t("post.deleteConfirmation")}
                cancelText={t("post.cancel")}
                okButtonProps={{ id: GTM.post.prefix + GTM.post.delete }}
              >
                {deleteModalVisibility === DELETE_MODAL_POST ? (
                  <p>{t("post.deletePostConfirmation")}</p>
                ) : (
                  <p>{t("post.deleteCommentConfirmation")}</p>
                )}
              </DeleteModal>
              {callReport ? (
                <CreateReport
                  callReport={callReport}
                  setCallReport={setCallReport}
                  postId={post._id}
                />
              ) : null}
            </PostCard>
          )}
        </>
      )}
    </>
  );
};
const renderContent = (title, content, highlightWords, showComplete, convertTextToURL) => {
  let finalContent = content;
  if (finalContent.length > CONTENT_LENGTH && !showComplete) {
    finalContent = `${finalContent.substring(0, CONTENT_LENGTH)} . . .`;
  }
  return (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        <Highlight textObj={convertTextToURL ? linkify(title): title} highlight={highlightWords} />
      </Heading>
      <p className="post-description">
        <Highlight textObj={convertTextToURL ? linkify(finalContent) : finalContent} highlight={highlightWords} />
      </p>
    </Card.Body>
  );
};

const mapStateToProps = ({ session: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Post);
