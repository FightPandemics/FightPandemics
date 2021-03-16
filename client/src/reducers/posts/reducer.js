import { POSTS_ACTIONS } from "./actions";

const innitialState = {
  posts: [],
  page: 0,
  error: null,
  isLoading: false,
  loadMore: true,
  isCachedStale: false,
  profilePosts: {},
};

export const getProfileObjectiveProp = (view) => {
  // convert 'request' or 'offer' tab to requests or offers prop name
  const viewMap = {
    request: "requests",
    offer: "offers",
  };
  return viewMap[view];
};

export const getProfileModeProp = (mode) => {
  // convert I, A, undefined to active, inactive, all
  const modeMap = {
    A: "active",
    IA: "inactive",
    undefined: "all",
  };
  return modeMap[mode];
};

const postsReducer = (state = innitialState, action) => {
  switch (action.type) {
    case POSTS_ACTIONS.FETCH_POSTS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_ACTIONS.FETCH_POSTS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        posts: payload,
        isLoading: false,
      };
    }

    case POSTS_ACTIONS.FETCH_PROFILE_POSTS_SUCCESS: {
      let { posts, userId, objective, mode } = action.payload;
      objective = getProfileObjectiveProp(objective);
      mode = getProfileModeProp(mode);
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [userId]: {
            ...state.profilePosts[userId],
            [objective]: {
              ...state.profilePosts[userId]?.[objective],
              [mode]: posts,
            },
          },
        },
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
    case POSTS_ACTIONS.SET_PAGE:
      const { payload } = action;
      return { ...state, page: payload.page };
    case POSTS_ACTIONS.RESET_PAGE: {
      const { payload } = action;
      return {
        ...state,
        page: 0,
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
    case POSTS_ACTIONS.SET_REPORTED: {
      const { payload } = action;
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.postId]: {
            ...state.posts[payload.postId],
            didReport: true,
          },
        },
      };
    }
    case POSTS_ACTIONS.SHOW_ANYWAY: {
      const { payload } = action;
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.postId]: {
            ...state.posts[payload.postId],
            reportsCount: 0,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default postsReducer;
