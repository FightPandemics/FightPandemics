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
    case POSTS_ACTIONS.FETCH_REQUESTS_ACTIVE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [payload.userId]: {
            ...state.profilePosts[payload.userId],
            requests: {
              ...state.profilePosts[payload.userId]?.requests,
              active: payload.posts,
            }
          }
        },
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.FETCH_REQUESTS_INACTIVE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [payload.userId]: {
            ...state.profilePosts[payload.userId],
            requests: {
              ...state.profilePosts[payload.userId]?.requests,
              inactive: payload.posts,
            }
          }
        },
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.FETCH_OFFERS_ACTIVE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [payload.userId]: {
            ...state.profilePosts[payload.userId],
            offers: {
              ...state.profilePosts[payload.userId]?.offers,
              active: payload.posts,
            }
          }
        },
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.FETCH_OFFERS_INACTIVE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [payload.userId]: {
            ...state.profilePosts[payload.userId],
            offers: {
              ...state.profilePosts[payload.userId]?.offers,
              inactive: payload.posts,
            }
          }
        },
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.FETCH_POSTS_REQUESTS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [payload.userId]: {
            ...state.profilePosts[payload.userId],
            requests: {
              ...state.profilePosts[payload.userId]?.requests,
              all: payload.posts,
            }
          }
        },
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.FETCH_POSTS_OFFERS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [payload.userId]: {
            ...state.profilePosts[payload.userId],
            offers: {
              ...state.profilePosts[payload.userId]?.offers,
              all: payload.posts,
            }
          }
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
