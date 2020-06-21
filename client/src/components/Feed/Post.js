// Core
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal as WebModal } from "antd";
import { connect } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
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
import { StyledWizard } from "components/StepWizard";
import SubMenuButton from "components/Button/SubMenuButton";
import TextAvatar from "components/TextAvatar";
import { typeToTag } from "assets/data/formToPostMappings";
import WizardFormNav from "components/StepWizard/WizardFormNav";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";

export const CONTENT_LENGTH = 120;

const Post = ({
  editPostModal,
  fullPostLength,
  handlePostLike,
  isAuthenticated,
  loadContent,
  onClick,
  onSelect,
  onChange,
  post,
  postDelete,
  user,
}) => {
  const comments = useRef([]);
  const limit = useRef(5);
  const loadedComments = useRef(0);
  const page = useRef(0);

  const { postId } = useParams();
  const history = useHistory();
  const historyLocation = history.location;

  const [comment, setComment] = useState([]);
  const [copied, setCopied] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadVisibility, setLoadVisibility] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const AvatarName =
    (post &&
      post.author &&
      post.author.name &&
      post.author.name.match(/\b\w/g).join("").toUpperCase()) ||
    "";

  // mock API to test functionality
  /* to be removed after full integration with user api */
  const [shared, setShared] = useState(false);
  const [fakeShares, setFakeShares] = useState(0);

  const handlePostDelete = () => {
    setModalVisibility(!modalVisibility);
  };

  const loadMoreComments = async () => {
    setLoading(true);
    if (firstLoad) {
      page.current = page.current + 2;
      setFirstLoad(false);
    } else {
      page.current = page.current + 1;
    }
    let response;
    const postId = post._id;

    const skip = 0;
    const endPoint = `/api/posts/${postId}/comments?limit=${
      limit.current * page.current
    }&skip=${skip}`;

    try {
      response = await axios.get(endPoint);
    } catch (error) {
      console.log({ error });
    }
    if (response && response.data) {
      const currentComments = response.data;
      const previousComments = [...comments.current];
      let allComments = [...previousComments, ...currentComments].sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : 1,
      );

      allComments = allComments.filter(
        (comment1, index, self) =>
          index === self.findIndex((comment2) => comment2._id === comment1._id),
      );
      post.numComments = allComments.length;
      if (post.numComments === loadedComments.current) {
        setLoadVisibility(false);
      }
      loadedComments.current = post.numComments;
      comments.current = allComments;
    } else {
      setLoadVisibility(false);
      page.current = 0;
    }
    const currentPage = page.current;
    const currentLimit = limit.current;
    limit.current = currentLimit * currentPage;
    setLoading(false);
  };

  const loadComments = async () => {
    let response;
    const postId = post._id;

    const limit = 5;
    const skip = page.current * limit;
    const endPoint = `/api/posts/${postId}/comments?limit=${limit}&skip=${skip}`;

    if (isAuthenticated) {
      try {
        response = await axios.get(endPoint);
      } catch (error) {
        console.log({ error });
      }
      if (response && response.data) {
        setLoadVisibility(true);
        comments.current = response.data;
        post.numComments = response.data.length;
        loadedComments.current = post.numComments;
      }
    }
  };

  useEffect(() => {
    if (
      historyLocation &&
      historyLocation.state &&
      historyLocation.state.comments
    ) {
      loadMoreComments();
      setShowComments(!showComments);
    } else {
      loadComments();
      setLoadVisibility(true);
      setLoading(false);
    }
  }, [history, editPostModal]); // eslint-disable-line react-hooks/exhaustive-deps

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
    }

    if (response && response.data) {
      setComment([]);
      await loadMoreComments();
    }
  };

  const ViewMore = ({ onClick, loadContent }) => (
    <Card.Body className="view-more-wrapper">
      {post && (
        <div onClick={onClick}>
          {loadContent ? (
            <span className="view-more">View Less</span>
          ) : (
            <span className="view-more">View More</span>
          )}
        </div>
      )}
    </Card.Body>
  );

  const RenderViewMore = ({ onClick, loadContent }) => {
    return !postId && post && isAuthenticated ? (
      <Link
        to={{
          pathname: `post/${post._id}`,
          state: {
            post: post,
            postId: post._id,
            user,
          },
        }}
      >
        <ViewMore onClick={onClick} loadContent={loadContent} />
      </Link>
    ) : (
      <>
        {isAuthenticated ? (
          <ViewMore onClick={onClick} loadContent={loadContent} />
        ) : (
          <Link to={{ pathname: LOGIN }}>
            <ViewMore loadContent={loadContent} />
          </Link>
        )}
      </>
    );
  };

  const renderHeader = (
    <Card.Header
      title={post.author.name}
      thumb={
        post.author.photo ? (
          post.author.photo
        ) : (
          <TextAvatar>{AvatarName}</TextAvatar>
        )
      }
      extra={
        <span>
          <SvgIcon src={statusIndicator} className="status-icon" />
          {post.author.location.country}
        </span>
      }
    />
  );

  const renderContent = (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        {post.title}
      </Heading>
      <p className="post-description">{post.content}</p>
    </Card.Body>
  );

  const renderTags = (
    <Card.Body>
      {post.types &&
        post.types.map((tag, idx) => (
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
      {showComments && isAuthenticated ? (
        <>
          <Comments
            comments={comments.current}
            handleOnChange={handleOnChange}
          />
          {loadVisibility && (post.numComments > 4 || !editPostModal) ? (
            <Button disabled={loading} onClick={loadMoreComments}>
              {loading ? "Loading..." : "Show More Comments"}
            </Button>
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
        liked={post.liked}
        shared={shared}
        postpage={postId}
        showComments={showComments}
        numLikes={post.likesCount}
        numComments={post.commentsCount}
        numShares={fakeShares}
        isAuthenticated={isAuthenticated}
        setShowComments={() => setShowComments(!showComments)}
        onCopyLink={() => {
          if (!shared) setFakeShares(fakeShares + 1);
          setShared(true);
          return setCopied(!copied);
        }}
        id={post._id}
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
      {postId ? (
        //Post in post's page.
        <PostCard
          style={{
            display: "inline-block",
            maxWidth: "80rem",
            marginTop: "1rem",
          }}
        >
          <div className="card-header">
            {renderHeader}
            <div className="card-submenu">
              {isAuthenticated &&
                user &&
                (user._id === post.author.id || user.id === post.author.id) && (
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
          {fullPostLength > CONTENT_LENGTH && (
            <RenderViewMore
              postId={postId}
              onClick={onClick}
              loadContent={loadContent}
            />
          )}
          {renderSocialIcons}
          {renderShareModal}
          {renderComments}
          <WebModal
            title="Confirm"
            visible={modalVisibility}
            onOk={() => postDelete(post)}
            onCancel={handlePostDelete}
            okText="Delete"
            cancelText="Cancel"
          >
            <p>Are you sure you want to delete the post?</p>
          </WebModal>
          {loadContent && <StyledWizard nav={<WizardFormNav />}></StyledWizard>}
        </PostCard>
      ) : (
        //Post in feed.
        <PostCard>
          <div className="card-header">
            {renderHeader}
            <div className="card-submenu">
              {isAuthenticated &&
                user &&
                (user._id === post.author.id || user.id === post.author.id) && (
                  <SubMenuButton
                    onChange={handlePostDelete}
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
          {isAuthenticated ? (
            <Link
              to={{
                pathname: `post/${post._id}`,
                state: {
                  post: post,
                  postId: post._id,
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
            (post.content.length > CONTENT_LENGTH && (
              <RenderViewMore
                postId={postId}
                onClick={onClick}
                loadContent={loadContent}
              />
            ))}
          {renderSocialIcons}
          {renderShareModal}
          <WebModal
            title="Confirm"
            visible={modalVisibility}
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
