import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";

// Local
import Post from "components/Feed/Post";
import EditPost from "components/CreatePost/EditPost";
import { typeToTag } from "assets/data/formToPostMappings";

// Constants
import { SET_LIKE } from "hooks/actions/feedActions";
import { FEED, LOGIN } from "templates/RouteWithSubRoutes";

const PostPage = ({ user, onChange, updateComments, isAuthenticated }) => {
  const history = useHistory();
  const { postId } = useParams();

  const [loadContent, setLoadContent] = useState(true);
  const [fullPost, setFullPost] = useState("");
  const [editPostModal, setEditPostModal] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [shortPost, setShortPost] = useState("");
  const [post, setPost] = useState("");
  const [editPost, setEditPost] = useState("");

  const redirectFromFeed = () => {
    setEditPostModal(!editPostModal);
  };

  const handlePostLike = async (postId, liked, create) => {
    sessionStorage.removeItem("likePost");

    if (isAuthenticated) {
      const endPoint = `/api/posts/${postId}/likes/${user && user.id}`;
      let response = {};

      if (user) {
        if (liked) {
          try {
            response = await axios.delete(endPoint);
          } catch (error) {
            console.log({ error });
          }
        } else {
          try {
            response = await axios.put(endPoint);
          } catch (error) {
            console.log({ error });
          }
        }

        if (response.data) {
          const currentPost = { ...post };

          currentPost.liked = !!!liked;
          currentPost.likesCount = response.data.likesCount;
          setPost(currentPost);
        }
      }
    } else {
      if (create) {
        sessionStorage.setItem("likePost", postId);
        history.push(LOGIN);
      }
    }
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
    let deleterResponse;
    if (
      isAuthenticated &&
      user &&
      (user._id === post.author.id || user.id === post.author.id)
    ) {
      setModalVisibility(!modalVisibility);
      history.push(FEED);
      let endPoint = `/api/posts/${postId}`;
      try {
        deleterResponse = await axios.delete(endPoint);
        if (deleterResponse && deleterResponse.data.success === true) {
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
    let response;
    const endPoint = `/api/posts/${postId}`;
    
    if (history.location.state.edit) {
      redirectFromFeed();
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
      const postSubstring = `${response.data.post.content.substring(
        0,
        120,
      )} . . .`;

      response.data.post.content = postSubstring;
      setPost(copiedpost);
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
        onSelect={handleEditPost}
        onChange={handlePostDelete}
        updateComments={updateComments}
        user={user}
        handlePostLike={handlePostLike}
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
