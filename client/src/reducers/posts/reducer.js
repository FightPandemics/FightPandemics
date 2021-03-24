import { POSTS_ACTIONS } from "./actions";
import { isPostExpired } from "components/Feed/utils";

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
    case POSTS_ACTIONS.UPDATE_PROFILE_POST_SUCCESS: {
      let { post, userId } = action.payload;
      const isExpired = isPostExpired(post);
      const objective = getProfileObjectiveProp(post.objective);

      // map though all Profile Posts to update (likes, edits, etc.)
      let currentPosts = state.profilePosts[userId]?.[objective]?.all;
      currentPosts =
        currentPosts !== undefined
          ? currentPosts.map((currentPost) => {
              if (currentPost._id !== post._id) {
                return currentPost;
              }
              return {
                ...currentPost,
                ...post,
              };
            })
          : undefined;

      let currentActivePosts = state.profilePosts[userId]?.[objective]?.active;
      let currentInActivePosts =
        state.profilePosts[userId]?.[objective]?.inactive;

      if (!isExpired) {
        // map through active Profile posts to update
        currentActivePosts =
          currentActivePosts !== undefined
            ? currentActivePosts.map((currentActivePost) => {
                if (currentActivePost._id !== post._id) {
                  return currentActivePost;
                }
                return {
                  ...currentActivePost,
                  ...post,
                };
              })
            : undefined;
      } else {
        // map though achived Profile posts to update
        currentInActivePosts =
          currentInActivePosts !== undefined
            ? currentInActivePosts.map((currentInActivePost) => {
                if (currentInActivePost._id !== post._id) {
                  return currentInActivePost;
                }
                return {
                  ...currentInActivePost,
                  ...post,
                };
              })
            : undefined;
      }
      return {
        ...state,
        error: null,
        profilePosts: {
          ...state.profilePosts,
          [userId]: {
            ...state.profilePosts[userId],
            [objective]: {
              active: currentActivePosts,
              inactive: currentInActivePosts,
              all: currentPosts,
            },
          },
        },
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
          [payload.post._id]: {
            ...state.posts[payload.post._id],
            liked: payload.post.liked,
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
