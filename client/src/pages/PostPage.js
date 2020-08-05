import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

// Local
import EditPost from "components/CreatePost/EditPost";
import { ProfileCompletedButtonsWrapper } from "components/CompletedProfile/CompletedProfile";
import Loader from "components/Feed/StyledLoader";
import Post, { CONTENT_LENGTH } from "components/Feed/Post";
import { StyledPostPage } from "components/Feed/StyledPostPage";
import { typeToTag } from "assets/data/formToPostMappings";
import { isAuthorOrg, isAuthorUser } from "pages/Feed";
import { postReducer, postState } from "hooks/reducers/postReducers";
import GTM from "constants/gtm-tags";

// Constants
import { FEED, LOGIN } from "templates/RouteWithSubRoutes";
import {
  SET_POST,
  FETCH_POST,
  SET_DELETE_MODAL_VISIBILITY,
  SET_EDIT_POST_MODAL_VISIBILITY,
  SET_SHORT_CONTENT,
  RESET_LOADMORE,
  SET_LOADMORE,
  SET_FULL_CONTENT,
  SET_LIKE,
} from "hooks/actions/postActions";
import {
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
  DELETE_MODAL_COMMENT,
} from "hooks/actions/feedActions";
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { font, two, four } = theme.typography.heading;

const Container = styled.div`
  padding: 6rem;
  display: flex;
  align-items: center;
  flex-flow: column;
  text-align: center;
  font-family: ${typography.font.family.display};
  font-size: ${typography.size.large};
  font-weight: normal;
`;

const Title = styled.h2`
  margin-bottom: 3rem;
  font-family: ${font};
  font-weight: bold;
  font-size: ${four};
  line-height: 3rem;
  text-align: center;
  width: 100%;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${two};
  }
`;

const Body = styled.p`
  margin-bottom: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 auto;
  font-weight: 500;
  display: block;
  text-align: center;
  background-color: ${theme.colors.white};
  font-size: ${theme.typography.size.large};
  color: ${theme.colors.royalBlue};
  line-height: 7rem;
  height: 7rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  &:focus {
    border: 1px solid ${theme.colors.royalBlue};
    color: ${theme.colors.royalBlue};
  }
`;

export const PostContext = React.createContext();

const PostPage = ({ user, updateComments, isAuthenticated }) => {
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

  const handlePostLike = async (postId, liked, create) => {
    sessionStorage.removeItem("likePost");

    if (isAuthenticated) {
      const endPoint = `/api/posts/${postId}/likes/${user?.id || user?._id}`;
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
          postDispatch({
            type: SET_LIKE,
            postId,
            count: response.data.likesCount,
          });
        }
      }
    } else {
      if (create) {
        sessionStorage.setItem("likePost", postId);
        history.push(LOGIN);
      }
    }
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
      visibility: DELETE_MODAL_POST,
    });
  };

  const handleCancelPostDelete = () => {
    postDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_HIDE,
    });
  };

  const handleCommentDelete = () => {
    postDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_COMMENT,
    });
  };

  const postDelete = async () => {
    let deleteResponse;
    if (
      isAuthenticated &&
      user &&
      (isAuthorUser(user, post) || isAuthorOrg(user.organisations, post.author))
    ) {
      dispatchPostAction(
        SET_DELETE_MODAL_VISIBILITY,
        "deleteModalVisibility",
        DELETE_MODAL_HIDE,
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

  const isPostDeleted = isEmpty(post.author) && post.status === SET_POST;

  useEffect(() => {
    loadPost(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPostDeleted)
    return (
      <Container>
        <Title>Ahh... snap!</Title>
        <Body>
          The post you have been looking for has expired. Please check our Help
          Board for more such posts.
        </Body>
        <ProfileCompletedButtonsWrapper>
          <StyledLink
            id={GTM.organisation.completedPrefix + GTM.profile.continueToFeed}
            to="/feed"
          >
            Help Board
          </StyledLink>
        </ProfileCompletedButtonsWrapper>
      </Container>
    );
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
                deleteModalVisibility={deleteModalVisibility}
                includeProfileLink={true}
                postDispatch={postDispatch}
                dispatchPostAction={dispatchPostAction}
                onClick={toggleViewContent}
                loadMorePost={loadMorePost}
                onSelect={handleEditPost}
                showComments={showComments}
                numComments={commentsCount}
                onChange={handlePostDelete}
                handleCancelPostDelete={handleCancelPostDelete}
                handleCommentDelete={handleCommentDelete}
                postDelete={postDelete}
                handlePostLike={handlePostLike}
                updateComments={updateComments}
                fullPostLength={postLength}
                user={user}
              />
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
