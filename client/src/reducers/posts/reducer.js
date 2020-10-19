import { POSTS_ACTIONS } from "./actions";

const innitialState = {
  status: POSTS_ACTIONS.SET_POSTS,
  posts: [],
  page: 0,
  error: null,
  filterType: "ALL",
  isLoading: false,
  loadMore: true,
  deleteModalVisibility: POSTS_ACTIONS.DELETE_MODAL_HIDE,
};

const postsReducer = (state = innitialState, action) => {
  switch (action.type) {
    case POSTS_ACTIONS.FETCH_POSTS:
      return {
        ...state,
        status: POSTS_ACTIONS.FETCH_POSTS,
        isLoading: true
      };
    case POSTS_ACTIONS.SET_POSTS:
      return {
        ...state,
        status: POSTS_ACTIONS.SET_POSTS,
        error: null,
        posts: action.posts,
        isLoading: false,
      };
    case POSTS_ACTIONS.ERROR_POSTS:
      return {
        ...state,
        status: POSTS_ACTIONS.ERROR_POSTS,
        error: action.error,
        posts: [],
        isLoading: false,
      };
    case POSTS_ACTIONS.NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case POSTS_ACTIONS.RESET_PAGE:
      return {
        ...state,
        page: 0,
        filterType: action.filterType || "",
        posts: [],
        loadMore: action.loadMore || true,
        isLoading: action.isLoading || false,
      };
    case POSTS_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: false,
        loadMore: false,
      };
    case POSTS_ACTIONS.SET_DELETE_MODAL_VISIBILITY:
      return {
        ...state,
        deleteModalVisibility: action.visibility,
      };
    case POSTS_ACTIONS.SET_LIKE:
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

export default postsReducer;
