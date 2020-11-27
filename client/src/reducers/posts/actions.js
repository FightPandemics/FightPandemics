export const POSTS_ACTIONS = {
  FINISH_LOADING: "FINISH_LOADING",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_ERROR: "FETCH_POSTS_ERROR",
  NEXT_PAGE: "NEXT_PAGE",
  RESET_PAGE: "RESET_PAGE",
  SET_LIKE: "SET_LIKE",
  SET_LOADING: "SET_LOADING",
  SET_REPORTED: "SET_REPORTED",
  SHOW_AMYWAY: "SHOW_AMYWAY",
};

export const resetPageAction = ({ isLoading = false, loadMore = true }) => ({
  type: POSTS_ACTIONS.RESET_PAGE,
  payload: {
    isLoading,
    loadMore,
  },
});

export const setLikeAction = (postId, count) => ({
  type: POSTS_ACTIONS.SET_LIKE,
  payload: {
    postId,
    count,
  },
});

export const fetchPostsBegin = () => ({
  type: POSTS_ACTIONS.FETCH_POSTS_BEGIN,
});

export const fetchPostsSuccess = ({ posts }) => ({
  type: POSTS_ACTIONS.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsError = (error) => ({
  type: POSTS_ACTIONS.FETCH_POSTS_ERROR,
  payload: error,
});

export const finishLoadingAction = () => ({
  type: POSTS_ACTIONS.FINISH_LOADING,
});

export const setNextPageAction = () => ({
  type: POSTS_ACTIONS.NEXT_PAGE,
});

export const setPageAction = (page) => ({
  type: POSTS_ACTIONS.NEXT_PAGE,
  payload: { page },
});

export const setLoadingAction = ({ isLoading, loadMore }) => ({
  type: POSTS_ACTIONS.SET_LOADING,
  payload: { isLoading, loadMore },
});

export const setReported = ({ postId }) => ({
  type: POSTS_ACTIONS.SET_REPORTED,
  payload: { postId },
});

export const showAnyway = ({ postId }) => ({
  type: POSTS_ACTIONS.SHOW_AMYWAY,
  payload: { postId },
});

export const postsActions = {
  resetPageAction,
  setLikeAction,
  fetchPostsBegin,
  fetchPostsSuccess,
  fetchPostsError,
  finishLoadingAction,
  setLoadingAction,
  setNextPageAction,
  setPageAction,
  setReported,
  showAnyway,
};
