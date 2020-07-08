import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useHistory, useParams } from "react-router-dom";

import EditPost from "components/CreatePost/EditPost";
import Loader from "components/Feed/StyledLoader";
import { FEED } from "templates/RouteWithSubRoutes";
import Post, { CONTENT_LENGTH } from "components/Feed/Post";
import { StyledPostPage } from "components/Feed/StyledPostPage";
import { typeToTag } from "assets/data/formToPostMappings";
import { isAuthorOrg } from "pages/Feed";

import { postReducer, postState } from "hooks/reducers/postReducers";
import {
  SET_POST,
  FETCH_POST,
  SET_DELETE_MODAL_VISIBILITY,
  SET_EDIT_POST_MODAL_VISIBILITY,
  SET_SHORT_CONTENT,
  RESET_LOADMORE,
  SET_LOADMORE,
  SET_FULL_CONTENT,
} from "hooks/actions/postActions";

export const PostContext = React.createContext();

const PostPage = ({
  user,
  updateComments,
  isAuthenticated,
  handlePostLike,
}) => {
  const history = useHistory();
  const { postId } = useParams();
  const [post, postDispatch] = useReducer(postReducer, postState);
  const dispatchPostAction = (type, key1, value1, key2, value2) => {
    let obj = { type };

    if (key1 && key2) {
      obj[key1] = value1;
      obj[key2] = value2;
      postDispatch(obj);
    } else if (type) {
      postDispatch(obj);
    } else {
      obj[key1] = value1;
      postDispatch(obj);
    }
  };

  const {
    postLength,
    fullContent,
    partialContent: postSubstring,
    editPostModalVisibility,
    deleteModalVisibility,
    loadMorePost,
    commentsCount,
    showComments,
  } = post;

  const initialState = { ...post };

  const editRedirectFromFeed = () => {
    postDispatch({
      type: SET_EDIT_POST_MODAL_VISIBILITY,
      visibility: true,
    });
  };

  const handleEditPost = () => {
    if (editPostModalVisibility) {
      postDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: false,
      });
    } else {
      postDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: true,
      });
    }
  };

  const handleCloseEditPost = () => {
    postDispatch({
      type: SET_EDIT_POST_MODAL_VISIBILITY,
      visibility: false,
    });
  };

  const toggleViewContent = async () => {
    if (!loadMorePost) {
      postDispatch({
        type: SET_POST,
        post,
        content: postSubstring,
      });
      dispatchPostAction(SET_LOADMORE);
    } else {
      postDispatch({
        type: SET_POST,
        post,
        content: fullContent,
      });
      dispatchPostAction(RESET_LOADMORE);
    }
  };

  const handlePostDelete = () => {
    postDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: true,
    });
  };

  const handleCancelPostDelete = () => {
    postDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: false,
    });
  };

  const postDelete = async () => {
    let deleteResponse;
    if (
      isAuthenticated &&
      user &&
      (user._id === post.author.id ||
        user.id === post.author.id ||
        isAuthorOrg(user.organisations, post.author))
    ) {
      dispatchPostAction(
        SET_DELETE_MODAL_VISIBILITY,
        "deleteModalVisibility",
        false,
      );
      history.push(FEED);
      let endPoint = `/api/posts/${postId}`;
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          dispatchPostAction(
            SET_POST,
            "post",
            initialState,
            "content",
            initialState.content,
          );
        }
      } catch (error) {
        console.log({ error });
        dispatchPostAction(SET_POST, "post", post, "content", post.content);
      }
    }
  };

  const deleteConfirmationModal = (
    <Modal
      title="Confirm"
      visible={deleteModalVisibility}
      onOk={postDelete}
      onCancel={handleCancelPostDelete}
      okText="Delete"
      cancelText="Cancel"
    >
      <p> Are you sure you want to delete the post? </p>
    </Modal>
  );

  const loadPost = async () => {
    let response;
    const endPoint = `/api/posts/${postId}`;

    dispatchPostAction(FETCH_POST);

    try {
      response = await axios.get(endPoint);
    } catch (error) {
      console.log({ error });
      dispatchPostAction(
        SET_POST,
        "post",
        initialState,
        "content",
        initialState.content,
      );
    }
    if (response && response.data) {
      response.data.post.types.map((type) => typeToTag(type));
      let copiedpost = Object.assign({}, response.data.post);
      let postSubstring = response.data.post.content;

      if (postSubstring.length > CONTENT_LENGTH) {
        postSubstring = `${postSubstring.substring(0, CONTENT_LENGTH)} . . .`;
      }
      postDispatch({
        type: SET_SHORT_CONTENT,
        content: postSubstring,
      });

      postDispatch({
        type: SET_FULL_CONTENT,
        content: copiedpost.content,
        length: copiedpost.content.length,
      });

      if (isAuthenticated) {
        postDispatch({
          type: SET_POST,
          post: copiedpost,
          content: copiedpost.content,
          length: copiedpost.content.length,
        });
      } else {
        postDispatch({
          type: SET_POST,
          post: response.data.post,
          content: response.data.post.content,
          length: copiedpost.content.length,
        });
      }
      //Check if routed to post's page after clicking on "Edit" in feed.
      if (history?.location?.state?.edit) {
        editRedirectFromFeed();
      }
    }
  };

  useEffect(() => {
    loadPost(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledPostPage>
      {postId && (
        <PostContext.Provider
          value={{
            user,
            fullContent,
            loadMorePost,
            updateComments,
            isAuthenticated,
            handlePostLike,
            editPostModalVisibility,
            dispatchPostAction,
            postDispatch,
            showComments,
          }}
        >
          {post && dispatchPostAction && postLength ? (
            <>
              <Post
                currentPost={post}
                includeProfileLink={true}
                postDispatch={postDispatch}
                dispatchPostAction={dispatchPostAction}
                numComments={post.commentsCount}
                onClick={toggleViewContent}
                loadMorePost={loadMorePost}
                onSelect={handleEditPost}
                showComments={showComments}
                numComments={commentsCount}
                onChange={handlePostDelete}
                handlePostLike={handlePostLike}
                updateComments={updateComments}
                fullPostLength={postLength}
                user={user}
              />
              {deleteConfirmationModal}
              <EditPost
                user={user}
                dispatchAction={dispatchPostAction}
                loadPost={loadPost}
                // onSelect={handleEditPost}
                isAuthenticated={isAuthenticated}
                onCancel={handleCloseEditPost}
                fullContent={fullContent}
                currentPost={post}
                visible={editPostModalVisibility}
              />
            </>
          ) : (
            <Loader />
          )}
        </PostContext.Provider>
      )}
    </StyledPostPage>
  );
};

export default PostPage;
