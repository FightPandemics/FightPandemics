import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_POSTS,
  FETCH_POSTS,
  ERROR_POSTS,
  NEXT_PAGE,
  RESET_PAGE,
  SET_LOADING,
  SET_LIKE,
} from "../actions/feedActions";

export const postsState = {
  status: SET_POSTS,
  posts: [],
  page: 0,
  error: null,
  filterType: "ALL",
  isLoading: false,
  loadMore: true,
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
    case RESET_PAGE:
      return {
        ...state,
        page: 0,
        filterType: action.filterType || "",
        posts: [],
        loadMore: true,
        isLoading: false,
      };
    case SET_LOADING:
      return { ...state, isLoading: false, loadMore: false };
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
