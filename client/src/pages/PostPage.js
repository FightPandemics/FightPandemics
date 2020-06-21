import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useHistory, useParams } from "react-router-dom";

import EditPost from "components/CreatePost/EditPost";
import { FEED } from "templates/RouteWithSubRoutes";
import Post, { CONTENT_LENGTH } from "components/Feed/Post";
import { typeToTag } from "assets/data/formToPostMappings";

const PostPage = ({
  user,
  updateComments,
  isAuthenticated,
  handlePostLike,
}) => {
  const history = useHistory();
  const { postId } = useParams();

  const [loadContent, setLoadContent] = useState(true);
  const [fullPost, setFullPost] = useState("");
  const [editPostModal, setEditPostModal] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [shortPost, setShortPost] = useState("");
  const [post, setPost] = useState("");
  const [editPost, setEditPost] = useState("");

  const editRedirectFromFeed = () => {
    setEditPostModal(!editPostModal);
  };

  const handleEditPost = async () => {
    setEditPostModal(!editPostModal);
  };
  const handleCloseEditPost = async () => {
    setEditPostModal(!editPostModal);
    loadPost();
  };

  const toggleViewContent = async () => {
    setLoadContent(!loadContent);
    if (!loadContent) {
      setPost(fullPost);
    } else {
      setPost(shortPost);
    }
  };

  const handlePostDelete = () => {
    setModalVisibility(!modalVisibility);
  };

  const postDelete = async () => {
    let deleteResponse;
    if (
      isAuthenticated &&
      user &&
      (user._id === post.author.id || user.id === post.author.id)
    ) {
      setModalVisibility(!modalVisibility);
      history.push(FEED);
      let endPoint = `/api/posts/${postId}`;
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          console.log("success!");
          return;
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const deleteConfirmationModal = (
    <Modal
      title="Confirm"
      visible={modalVisibility}
      onOk={postDelete}
      onCancel={handlePostDelete}
      okText="Delete"
      cancelText="Cancel"
    >
      <p> Are you sure you want to delete the post? </p>
    </Modal>
  );

  const loadPost = async () => {
    let postSubstring;
    let response;
    const endPoint = `/api/posts/${postId}`;

    if (
      history &&
      history.location &&
      history.location.state &&
      history.location.state.edit
    ) {
      editRedirectFromFeed();
    }

    try {
      response = await axios.get(endPoint);
    } catch (error) {
      console.log({ error });
    }
    if (response && response.data) {
      response.data.post.types.map((type) => typeToTag(type));
      let copiedpost = Object.assign({}, response.data.post);
      setFullPost(copiedpost);
      setEditPost(copiedpost);
      if (copiedpost.content.length > CONTENT_LENGTH) {
        postSubstring = `${response.data.post.content.substring(
          0,
          CONTENT_LENGTH,
        )} . . .`;
      } else {
        postSubstring = response.data.post.content;
      }

      response.data.post.content = postSubstring;
      if (isAuthenticated) {
        setPost(copiedpost);
      } else {
        setPost(response.data.post);
      }
      setShortPost(response.data.post);
    }
  };

  useEffect(() => {
    if (postId) {
      loadPost();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return post ? (
    <>
      <Post
        post={post}
        onClick={(e) => toggleViewContent(e)}
        loadContent={loadContent}
        editPostModal={editPostModal}
        onSelect={handleEditPost}
        onChange={handlePostDelete}
        handlePostLike={handlePostLike}
        updateComments={updateComments}
        fullPostLength={fullPost.content.length}
        user={user}
      />
      {deleteConfirmationModal}
      <EditPost
        user={user}
        onSelect={handleEditPost}
        isAuthenticated={isAuthenticated}
        onCancel={handleCloseEditPost}
        loadPost={loadPost}
        post={editPost}
        visible={editPostModal}
      />
    </>
  ) : (
    <> </>
  );
};

export default PostPage;
