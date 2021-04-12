import { POSTS_ACTIONS } from "./actions";
import { isPostExpired } from "components/Feed/utils";

const initialState = {
  applicants: [],
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

const applicantsReducer = (state = initialState, action) => {
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
        applicants: payload,
        isLoading: false,
      };
    }

    case POSTS_ACTIONS.FETCH_PROFILE_POSTS_SUCCESS: {
      let { applicants, userId, objective, mode } = action.payload;
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
              [mode]: applicants,
            },
          },
        },
        isLoading: false,
      };
    }
    case POSTS_ACTIONS.UPDATE_PROFILE_POST_SUCCESS: {
      let { applicant, userId } = action.payload;
      const isExpired = isPostExpired(applicant);
      const objective = getProfileObjectiveProp(applicant.objective);

      // map though all Profile Posts to update (likes, edits, etc.)
      let currentPosts = state.profilePosts[userId]?.[objective]?.all;
      currentPosts =
        currentPosts !== undefined
          ? currentPosts.map((currentPost) => {
              if (currentPost._id !== applicant._id) {
                return currentPost;
              }
              return {
                ...currentPost,
                ...applicant,
              };
            })
          : undefined;

      let currentActivePosts = state.profilePosts[userId]?.[objective]?.active;
      let currentInActivePosts =
        state.profilePosts[userId]?.[objective]?.inactive;

      if (!isExpired) {
        // map through active Profile applicants to update
        currentActivePosts =
          currentActivePosts !== undefined
            ? currentActivePosts.map((currentActivePost) => {
                if (currentActivePost._id !== applicant._id) {
                  return currentActivePost;
                }
                return {
                  ...currentActivePost,
                  ...applicant,
                };
              })
            : undefined;
      } else {
        // map though achived Profile applicants to update
        currentInActivePosts =
          currentInActivePosts !== undefined
            ? currentInActivePosts.map((currentInActivePost) => {
                if (currentInActivePost._id !== applicant._id) {
                  return currentInActivePost;
                }
                return {
                  ...currentInActivePost,
                  ...applicant,
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
        applicants: [],
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
        applicants: [],
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
        applicants: {
          ...state.applicants,
          [payload.applicant._id]: {
            ...state.applicants[payload.applicant._id],
            liked: payload.applicant.liked,
            likesCount: payload.count,
          },
        },
      };
    }
    case POSTS_ACTIONS.SET_REPORTED: {
      const { payload } = action;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          [payload.organizationId]: {
            ...state.applicants[payload.organizationId],
            didReport: true,
          },
        },
      };
    }
    case POSTS_ACTIONS.SHOW_ANYWAY: {
      const { payload } = action;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          [payload.organizationId]: {
            ...state.applicants[payload.organizationId],
            reportsCount: 0,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default applicantsReducer;
