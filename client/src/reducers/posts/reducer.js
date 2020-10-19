import { POSTS_ACTIONS } from "./actions";

const innitialState = {
  posts: [],
  page: 0,
  error: null,
  filterType: "ALL",
  isLoading: false,
  loadMore: true
};

const postsReducer = (state = innitialState, action) => {
  switch (action.type) {
    case POSTS_ACTIONS.FETCH_POSTS_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case POSTS_ACTIONS.FETCH_POSTS_SUCCESS: {
      const { payload } = action;
      console.info(payload);
      return {
        ...state,
        error: null,
        posts: payload,
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.FETCH_POSTS_ERROR: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        posts: [],
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case POSTS_ACTIONS.RESET_PAGE: {
      const { payload } = action;
      return {
        ...state,
        page: 0,
        filterType: payload.filterType,
        posts: [],
        loadMore: payload.loadMore,
        isLoading: payload.isLoading,
      };
    }
    case POSTS_ACTIONS.FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
        loadMore: false,
      };
    case POSTS_ACTIONS.SET_LIKE: {
      const { payload } = action;
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.postId]: {
            ...state.posts[payload.postId],
            liked: !!!state.posts[payload.postId].liked,
            likesCount: payload.count,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default postsReducer;
