// Core
import React, { useEffect, useState, useRef } from "react";
import { Modal as WebModal } from "antd";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Modal, Card, WhiteSpace } from "antd-mobile";
import axios from "axios";

// Local
import AutoSize from "components/Input/AutoSize";
import Comments from "./Comments";
import FilterTag from "components/Tag/FilterTag";
import Heading from "components/Typography/Heading";
import { LOGIN } from "templates/RouteWithSubRoutes";
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import SubMenuButton from "components/Button/SubMenuButton";
import WizardFormNav, {
  StyledButtonWizard,
} from "components/StepWizard/WizardFormNav";
import { StyledLoadMoreButton } from "./StyledCommentButton";
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
import { isAuthorOrg } from "pages/Feed";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";
const INDIVIDUAL_AUTHOR_TYPE = "Individual";

export const CONTENT_LENGTH = 120;
const Post = ({
  currentPost,
  deleteModalVisibility,
  dispatchPostAction,
  fullPostLength,
  handlePostDelete,
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
    isLoading,
    loadMoreComments,
    page,
  } = post || {};

  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState([]);

  const AvatarName =
    (post?.author?.name &&
      post.author.name.match(/\b\w/g).join("").toUpperCase()) ||
    "";

  const authorProfileLink = `/${
    post.author.type === INDIVIDUAL_AUTHOR_TYPE ? "profile" : "organization"
  }/${post.author.id}`;
  // mock API to test functionality
  /* to be removed after full integration with user api */
  const [shared, setShared] = useState(false);
  const [fakeShares, setFakeShares] = useState(0);

  const setShowComments = () => {
    if (dispatchPostAction) {
      dispatchPostAction(TOGGLE_SHOW_COMMENTS);
    }
  };

  const loadComments = async () => {
    if (commentsCount !== 0) {
      dispatchPostAction(NEXT_PAGE);
      dispatchPostAction(NEXT_PAGE);
    } else {
      dispatchPostAction(NEXT_PAGE);
    }

    let response;
    let previousComments = [...comments];
    const skip = 0;
    const endPoint = `/api/posts/${postId}/comments?limit=${
      limit.current * page
    }&skip=${skip}`;

    dispatchPostAction(SET_LOADING);

    try {
      response = await axios.get(endPoint);
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
          allComments.length,
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
    const postId = post._id;
    const endPoint = `/api/posts/${postId}/comments`;
    const newComment = {
      content: comment,
    };

    try {
      response = await axios.post(endPoint, newComment);
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
        allComments.length,
      );
      setComment([]);
    }
  };

  const deleteComment = async (comment) => {
    let response;
    const postId = comment.postId;
    const commentId = comment._id;
    if (isAuthenticated && comment.author.id === user.id) {
      const endPoint = `/api/posts/${postId}/comments/${commentId}`;

      try {
        response = await axios.delete(endPoint);
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
          filterComments.length,
        );
      }
    }
  };

  const ViewMore = ({ onClick }) => (
    <Card.Body className="view-more-wrapper">
      {postId && isAuthenticated ? (
        <div onClick={onClick}>
          {!loadMorePost ? (
            <span className="view-more">View Less</span>
          ) : (
            <span className="view-more">View More</span>
          )}
        </div>
      ) : (
        <span className="view-more">View More</span>
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
          <Link to={{ pathname: LOGIN }}>
            <ViewMore loadContent={loadMorePost} />
          </Link>
        )}
      </>
    );
  };

  const renderHeader = (
    <Card.Header
      title={post?.author?.name}
      thumb={
        post?.author?.photo ? (
          post.author.photo
        ) : (
          <TextAvatar>{AvatarName}</TextAvatar>
        )
      }
      extra={
        <span>
          <SvgIcon src={statusIndicator} className="status-icon" />
          {post?.author?.location?.city ? `${post.author.location.city}, ` : ""}
          {post?.author?.location?.country ? post.author.location.country : ""}
        </span>
      }
    />
  );

  const renderHeaderWithLink = (
    <Link to={authorProfileLink}>{renderHeader}</Link>
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
          placeholder={"Write a comment..."}
          onPressEnter={handleComment}
          onChange={handleOnChange}
          value={comment}
        />
      ) : (
        <div>Only logged in users can comment.</div>
      )}
      {isAuthenticated ? (
        <>
          <Comments
            comments={comments}
            handleOnChange={handleOnChange}
            deleteComment={deleteComment}
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
        shared={shared}
        postpage={postId}
        showComments={showComments}
        numLikes={post?.likesCount}
        numComments={numComments}
        numShares={fakeShares}
        isAuthenticated={isAuthenticated}
        setShowComments={setShowComments}
        onCopyLink={() => {
          if (!shared) setFakeShares(fakeShares + 1);
          setShared(true);
          return setCopied(!copied);
        }}
        id={post?._id}
      />
    </Card.Body>
  );

  const renderShareModal = (
    <Modal
      onClose={() => setCopied(!copied)}
      maskClosable={true}
      closable={true}
      visible={copied}
      transparent
    >
      <Heading level={4} className="h4">
        Link Copied!
      </Heading>
    </Modal>
  );

  return (
    <>
      {postId && dispatchPostAction ? (
        //Post in post's page.
        <div>
          <PostCard
            style={{
              display: "inline-block",
              maxWidth: "80rem",
              marginTop: "1rem",
            }}
          >
            <div className="card-header">
              {includeProfileLink ? renderHeaderWithLink : renderHeader}
              <div className="card-submenu">
                {isAuthenticated &&
                  user &&
                  (user._id === post.author.id ||
                    user.id === post.author.id ||
                    (user.organizations &&
                      isAuthorOrg(user.organizations, post.author))) && (
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
              <Card.Body className="view-more-wrapper" />
            )}
            {renderSocialIcons}
            {renderShareModal}
            {renderComments}
            <WebModal
              title="Confirm"
              visible={deleteModalVisibility}
              onOk={() => postDelete(post)}
              onCancel={handlePostDelete}
              okText="Delete"
              cancelText="Cancel"
            >
              <p>Are you sure you want to delete the post?</p>
            </WebModal>
          </PostCard>
          {showComments && (
            <StyledButtonWizard nav={<WizardFormNav />}></StyledButtonWizard>
          )}
        </div>
      ) : (
        //Post in feed.
        <PostCard>
          <div className="card-header">
            {includeProfileLink ? renderHeaderWithLink : renderHeader}
            <div className="card-submenu">
              {isAuthenticated &&
                user &&
                (user?._id === post?.author?.id ||
                  user?.id === post?.author?.id ||
                  isAuthorOrg(user.organizations, post.author)) && (
                  <SubMenuButton
                    onChange={() => handlePostDelete(post)}
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
          {isAuthenticated && post ? (
            <Link
              to={{
                pathname: `/post/${_id}`,
                state: {
                  post: post,
                  postId: _id,
                  user,
                },
              }}
            >
              {renderContent}
            </Link>
          ) : (
            <>{renderContent}</>
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
          {renderShareModal}
          <WebModal
            title="Confirm"
            visible={deleteModalVisibility}
            onOk={() => postDelete(post)}
            onCancel={handlePostDelete}
            okText="Delete"
            cancelText="Cancel"
          >
            <p>Are you sure you want to delete the post?</p>
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
