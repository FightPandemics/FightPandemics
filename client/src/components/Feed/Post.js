// Core
import React, { useEffect, useState, useRef } from "react";
import { Modal as WebModal } from "antd";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, WhiteSpace } from "antd-mobile";
import axios from "axios";

// Local
import AutoSize from "components/Input/AutoSize";
import Comments from "./Comments";
import FilterTag from "components/Tag/FilterTag";
import Heading from "components/Typography/Heading";
import { LOGIN } from "templates/RouteWithSubRoutes";
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import { ShareModal } from "./PostShare";
import SubMenuButton from "components/Button/SubMenuButton";
import WizardFormNav, {
  StyledButtonWizard,
} from "components/StepWizard/WizardFormNav";
import { StyledLoadMoreButton } from "./StyledCommentButton";
import { StyledPostPagePostCard } from "./StyledPostPage";
import TextAvatar from "components/TextAvatar";
import { typeToTag } from "assets/data/formToPostMappings";
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

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import {
  DELETE_MODAL_POST,
  DELETE_MODAL_COMMENT,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";

const URLS = {
  // playStore: [""], // TODO: add once design is done
  // appStore: [""],
  website: [websiteIcon],
  email: [envelopeBlue],
};

export const CONTENT_LENGTH = 120;
const Post = ({
  currentPost,
  deleteModalVisibility,
  dispatchPostAction,
  fullPostLength,
  handleCancelPostDelete,
  handleCommentDelete,
  handlePostLike,
  includeProfileLink,
  isAuthenticated,
  loadMorePost,
  numComments,
  onClick,
  onSelect,
  onChange,
  postDelete,
  showComments,
  user,
}) => {
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const [comment, setComment] = useState([]);

  const AvatarName =
    (post?.author?.name && getInitialsFromFullName(post.author.name)) || "";

  const setShowComments = () => {
    if (dispatchPostAction) {
      dispatchPostAction(TOGGLE_SHOW_COMMENTS);
    }
  };

  const loadComments = async () => {
    if (commentsCount !== 0) {
      dispatchPostAction(NEXT_PAGE);
      // dispatchPostAction(NEXT_PAGE);
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
      if (previousComments.length === allComments.length) {
        dispatchPostAction(TOGGLE_COMMENTS);
      } else {
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
    if (isAuthenticated && comment.author.id === user.id) {
      const endPoint = `/api/posts/${postId}/comments/${commentId}`;
      const totalCommentCountEndPoint = `/api/posts/${postId}`;

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
          "numComments",
          commentCountRes.data.numComments,
        );
      }
    }
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

  const ViewMore = ({ onClick }) => (
    <Card.Body className="view-more-wrapper">
      {postId && isAuthenticated ? (
        <div onClick={onClick}>
          {!loadMorePost ? (
            <>
              <IconsContainer>{renderExternalLinks()}</IconsContainer>
              <span className="view-more">View Less</span>
            </>
          ) : (
              <span
                id={GTM.post.prefix + GTM.post.viewMore}
                className="view-more"
              >
                View More
              </span>
            )}
        </div>
      ) : (
          <span id={gtmTag("viewMore", GTM.feed.prefix)} className="view-more">
            View More
          </span>
        )}
    </Card.Body>
  );

  const RenderViewMore = ({ onClick }) => {
    return !postId && post && isAuthenticated ? (
      <Link
        to={{
          pathname: `/post/${post._id}`,
          state: {
            post: post,
            postId: post._id,
            from: window.location.href,
            user,
          },
        }}
      >
        <ViewMore />
      </Link>
    ) : (
        <>
          {isAuthenticated ? (
            <ViewMore onClick={onClick} loadContent={loadMorePost} />
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
                <ViewMore loadContent={loadMorePost} />
              </Link>
            )}
        </>
      );
  };

  const renderHeader = (
    <Card.Header
      title={
        <div className="title-wrapper">
          <div className="author">{post?.author?.name}</div>
          {post?.author?.location?.country ? (
            <div className="location-status">
              <SvgIcon src={statusIndicator} className="status-icon" />
              {buildLocationString(post.author.location)}
            </div>
          ) : (
              ""
            )}
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

  const renderContent = (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        {title}
      </Heading>
      <p className="post-description">{content}</p>
    </Card.Body>
  );

  const renderTags = (
    <Card.Body>
      {post?.types &&
        post?.types.map((tag, idx) => (
          <FilterTag key={idx} disabled={true} selected={false}>
            {typeToTag(tag)}
          </FilterTag>
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
          placeholder={"Write a comment..."}
          onPressEnter={handleComment}
          onChange={handleOnChange}
          value={typeof comment === "string" && comment}
        />
      ) : (
          <div>Only logged in users can comment.</div>
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
          {loadMoreComments && commentsCount >= 5 ? (
            <StyledLoadMoreButton disabled={isLoading} onClick={loadComments}>
              {isLoading ? "Loading..." : "Show More Comments"}
            </StyledLoadMoreButton>
          ) : (
              <></>
            )}
        </>
      ) : (
          ""
        )}
    </Card.Body>
  );

  const renderSocialIcons = (
    <Card.Body className="content-wrapper">
      <PostSocial
        handlePostLike={handlePostLike}
        url={window.location.href}
        liked={post?.liked}
        postId={postId}
        postTitle={post?.title}
        postContent={post?.content}
        showComments={showComments}
        numLikes={post?.likesCount}
        numComments={numComments}
        isAuthenticated={isAuthenticated}
        setShowComments={setShowComments}
        setShowShareModal={setShowShareModal}
        id={post?._id}
      />
    </Card.Body>
  );

  return (
    <>
      {postId && dispatchPostAction ? (
        //Post in post's page.
        <>
          <StyledPostPagePostCard>
            <div className="card-header">
              {includeProfileLink ? renderHeaderWithLink : renderHeader}
              <div className="card-submenu">
                {isAuthenticated &&
                  user &&
                  (isAuthorUser(user, post) ||
                    (user.organisations &&
                      isAuthorOrg(user.organisations, post.author))) && (
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
            {renderContent}
            {fullPostLength > CONTENT_LENGTH ? (
              <RenderViewMore
                postId={postId}
                onClick={onClick}
                loadMorePost={loadMorePost}
              />
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
            <WebModal
              title="Confirm"
              visible={
                !!deleteModalVisibility &&
                deleteModalVisibility !== DELETE_MODAL_HIDE
              }
              onOk={() => handleDeleteOk()}
              onCancel={handleCancelPostDelete}
              okText="Delete"
              cancelText="Cancel"
            >
              {(deleteModalVisibility === DELETE_MODAL_POST && (
                <p>Are you sure you want to delete the post?</p>
              )) || <p>Are you sure you want to delete the comment?</p>}
            </WebModal>
          </StyledPostPagePostCard>
          <StyledButtonWizard
            nav={<WizardFormNav gtmPrefix={GTM.post.prefix} />}
          />
        </>
      ) : (
          //Post in feed.
          <PostCard>
            <div className="card-header">
              {includeProfileLink ? renderHeaderWithLink : renderHeader}
              <div className="card-submenu">
                {isAuthenticated &&
                  user &&
                  (isAuthorUser(user, post) ||
                    isAuthorOrg(user.organisations, post.author)) && (
                    <SubMenuButton
                      onChange={handleDelete}
                      onSelect={onSelect}
                      post={post}
                      user={user}
                      postId={postId}
                    />
                  )}
              </div>
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
                  },
                }}
              >
                {renderContent}
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
                  {renderContent}
                </>
              )}
            {fullPostLength > CONTENT_LENGTH ||
              (post?.content?.length > CONTENT_LENGTH ? (
                <RenderViewMore
                  postId={postId}
                  onClick={onClick}
                  loadMorePost={loadMorePost}
                />
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
            <WebModal
              title="Confirm"
              visible={
                !!deleteModalVisibility &&
                deleteModalVisibility !== DELETE_MODAL_HIDE &&
                toDelete === post._id
              }
              onOk={() => handleDeleteOk()}
              onCancel={handleCancelPostDelete}
              okText="Delete"
              cancelText="Cancel"
            >
              {deleteModalVisibility === DELETE_MODAL_POST ? (
                <p>Are you sure you want to delete the post?</p>
              ) : (
                  <p>Are you sure you want to delete the comment?</p>
                )}
            </WebModal>
          </PostCard>
        )}
    </>
  );
};

const mapStateToProps = ({ session: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Post);
