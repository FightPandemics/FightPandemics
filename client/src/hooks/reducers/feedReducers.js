import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  SET_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_POSTS,
  FETCH_POSTS,
  ERROR_POSTS,
  NEXT_PAGE,
  RESET_PAGE,
  SET_LOADING,
  SET_LIKE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_HIDE,
  SET_PAGE,
} from "../actions/feedActions";

export const postsState = {
  status: SET_POSTS,
  posts: [],
  page: 0,
  error: null,
  isLoading: false,
  loadMore: true,
  deleteModalVisibility: DELETE_MODAL_HIDE,
};

export const feedReducer = (oldState, action) => {
  const { type, key, value } = action;
  switch (type) {
    case TOGGLE_STATE:
      return { ...oldState, [key]: !oldState[key] };
    case SET_VALUE:
      return { ...oldState, [key]: value };
    default:
      return oldState;
  }
};

export const optionsReducer = (oldState, action) => {
  const { option, label } = action.payload;
  const newState = Object.assign({}, oldState);
  switch (action.type) {
    case SET_OPTIONS:
      return { ...option };
    case ADD_OPTION:
      return { ...oldState, [label]: [...(oldState[label] || []), option] };
    case REMOVE_OPTION:
      newState[label] = newState[label].filter((o) => o !== option);
      if (!newState[label].length) delete newState[label];
      return newState;
    case REMOVE_ALL_OPTIONS:
      return {};
    default:
      return oldState;
  }
};

export const postsReducer = (state = postsState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, status: FETCH_POSTS, isLoading: true };
    case SET_POSTS:
      return {
        ...state,
        status: SET_POSTS,
        error: null,
        posts: action.posts,
        isLoading: false,
      };
    case ERROR_POSTS:
      return {
        ...state,
        status: ERROR_POSTS,
        error: action.error,
        posts: [],
        isLoading: false,
      };
    case NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case SET_PAGE:
      return { ...state, page: action.page };
    case RESET_PAGE:
      return {
        ...state,
        page: 0,
        posts: [],
        loadMore: action.loadMore || true,
        isLoading: action.isLoading || false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: false,
        loadMore: false,
      };
    case SET_DELETE_MODAL_VISIBILITY:
      return {
        ...state,
        deleteModalVisibility: action.visibility,
      };
    case SET_LIKE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.postId]: {
            ...state.posts[action.postId],
            liked: !!!state.posts[action.postId].liked,
            likesCount: action.count,
          },
        },
      };
    default:
      return state;
  }
};
