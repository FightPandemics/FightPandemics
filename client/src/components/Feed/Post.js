// Core
import React, { useCallback, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Modal, Card, WhiteSpace } from "antd-mobile";
import { Link, useParams } from "react-router-dom";
import { Modal as WebModal } from "antd";
import axios from "axios";

// Local
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import Comments from "./Comments";
import FilterTag from "components/Tag/FilterTag";
import AutoSize from "components/Input/AutoSize";
import Heading from "components/Typography/Heading";
import TextAvatar from "components/TextAvatar";
import SubMenuButton from "components/Button/SubMenuButton";
import { typeToTag } from "assets/data/formToPostMappings";
import { StyledWizard } from "components/StepWizard";
import WizardFormNav from "components/StepWizard/WizardFormNav";
// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";

const Post = ({
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
  const page = useRef(1);
  const { postId } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);

  const AvatarName =
    (post &&
      post.author &&
      post.author.name &&
      post.author.name.match(/\b\w/g).join("").toUpperCase()) ||
    "";

  // mock API to test functionality
  /* to be removed after full integration with user api */
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState("");
  const [fakeShares, setFakeShares] = useState(0);

  const handlePostDelete = () => {
    setModalVisibility(!modalVisibility);
  };

  const loadComments = useCallback(async () => {
    let response;
    const postId = post._id;

    const limit = 5;
    const skip = page.current * limit;
    const endPoint = `/api/posts/${postId}/comments?limit=${limit}&skip=${skip}`;

    if (showComments && !post.comments) {
      try {
        response = await axios.get(endPoint);
      } catch (error) {
        console.log({ error });
      }

      if (response && response.data) {
        setCurrentPost({ ...post, comments: response.data });
      }
    }
  }, [post, showComments, page]);

  useEffect(() => {
    loadComments();
  }, [showComments]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleComment = useCallback(
    async (e) => {
      e.preventDefault();
      let response = {};
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
        loadComments();
        setComment("");
      }
    },
    [comment, loadComments, post],
  );

  useEffect(() => {
    loadComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ViewMore = ({ onClick, loadContent }) => (
    <Card.Body className="view-more-wrapper">
      <div onClick={onClick}>
        {loadContent ? (
          <span className="view-more">View Less</span>
        ) : (
          <span className="view-more">View More</span>
        )}
      </div>
    </Card.Body>
  );

  const RenderViewMore = ({ onClick, loadContent }) => {
    return !postId ? (
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
      <ViewMore onClick={onClick} loadContent={loadContent} />
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
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      ) : (
        <div>Only logged in users can comment.</div>
      )}
      {showComments ? <Comments comments={currentPost.comments} /> : ""}
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
      <PostCard
        style={
          postId
            ? { display: "inline-block", maxWidth: "80rem", marginTop: "1rem" }
            : {}
        }
      >
        <div className="card-header">
          {renderHeader}
          <div className="card-submenu">
            {isAuthenticated &&
              user && 
              (user._id === post.author.id || user.id === post.author.id) &&
              (!postId ? (
                <SubMenuButton
                  onChange={handlePostDelete}
                  onSelect={onSelect}
                  post={post}
                  user={user}
                  postId={postId}
                />
              ) : (
                <SubMenuButton
                  onSelect={onSelect}
                  onChange={onChange}
                  postId={postId}
                  post={post}
                  user={user}
                />
              ))}
          </div>
        </div>
        <WhiteSpace size="md" />
        {renderTags}
        <WhiteSpace />
        {renderContent}
        <RenderViewMore
          postId={postId}
          onClick={onClick}
          loadContent={loadContent}
        />
        {postId ? (
          <>
            {renderSocialIcons}
            {renderComments}
            {renderShareModal}
          </>
        ) : (
          <>{renderSocialIcons}</>
        )}     
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
        {loadContent && 
        <StyledWizard nav={<WizardFormNav />}></StyledWizard>
        }   
      </PostCard>
    </>
  );
};

const mapStateToProps = ({ session: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Post);
