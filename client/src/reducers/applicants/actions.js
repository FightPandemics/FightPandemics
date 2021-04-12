export const POSTS_ACTIONS = {
  FINISH_LOADING: "FINISH_LOADING",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_ERROR: "FETCH_POSTS_ERROR",
  FETCH_PROFILE_POSTS_SUCCESS: "FETCH_PROFILE_POSTS_SUCCESS",
  UPDATE_PROFILE_POST_SUCCESS: "UPDATE_PROFILE_POST_SUCCESS",
  UPDATE_PROFILE_POST_COMMENTS: "UPDATE_PROFILE_POST_COMMENTS",
  NEXT_PAGE: "NEXT_PAGE",
  SET_PAGE: "SET_PAGE",
  RESET_PAGE: "RESET_PAGE",
  SET_LIKE: "SET_LIKE",
  SET_LOADING: "SET_LOADING",
  SET_REPORTED: "SET_REPORTED",
  SHOW_ANYWAY: "SHOW_ANYWAY",
};

export const resetPageAction = ({ isLoading = false, loadMore = true }) => ({
  type: POSTS_ACTIONS.RESET_PAGE,
  payload: {
    isLoading,
    loadMore,
  },
});

export const setLikeAction = (applicant, count) => ({
  type: POSTS_ACTIONS.SET_LIKE,
  payload: {
    applicant,
    count,
  },
});

export const fetchPostsBegin = () => ({
  type: POSTS_ACTIONS.FETCH_POSTS_BEGIN,
});

export const fetchPostsSuccess = ({ applicants }) => ({
  type: POSTS_ACTIONS.FETCH_POSTS_SUCCESS,
  payload: applicants,
});

export const fetchProfilePostSuccess = ({
  applicants,
  userId,
  objective,
  mode,
}) => ({
  type: POSTS_ACTIONS.FETCH_PROFILE_POSTS_SUCCESS,
  payload: { applicants, userId, objective, mode },
});

export const updateProfilePostSucess = ({ applicant, userId }) => ({
  type: POSTS_ACTIONS.UPDATE_PROFILE_POST_SUCCESS,
  payload: { applicant, userId },
});

export const updateProfilePostComment = ({ applicant, commentsCount }) => ({
  type: POSTS_ACTIONS.UPDATE_PROFILE_POST_COMMENTS,
  payload: { applicant, commentsCount },
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
  type: POSTS_ACTIONS.SET_PAGE,
  payload: { page },
});

export const setLoadingAction = ({ isLoading, loadMore }) => ({
  type: POSTS_ACTIONS.SET_LOADING,
  payload: { isLoading, loadMore },
});

export const setReported = ({ organizationId }) => ({
  type: POSTS_ACTIONS.SET_REPORTED,
  payload: { organizationId },
});

export const showAnyway = ({ organizationId }) => ({
  type: POSTS_ACTIONS.SHOW_ANYWAY,
  payload: { organizationId },
});

export const applicantsActions = {
  resetPageAction,
  setLikeAction,
  fetchPostsBegin,
  fetchPostsSuccess,
  fetchProfilePostSuccess,
  fetchPostsError,
  finishLoadingAction,
  setLoadingAction,
  setNextPageAction,
  setPageAction,
  setReported,
  showAnyway,
  updateProfilePostSucess,
  updateProfilePostComment,
};
