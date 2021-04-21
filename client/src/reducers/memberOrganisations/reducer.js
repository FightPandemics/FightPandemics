import { MEMBER_ORGS_ACTIONS } from "./actions";
import { isPostExpired } from "components/Feed/utils";

//TODO remove expired
const initialState = {
  memberOrgs: [],
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

const memberOrgsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_ORGS_ACTIONS.FETCH_MEMBER_ORGS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case MEMBER_ORGS_ACTIONS.FETCH_MEMBER_ORGS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        memberOrgs: payload,
        isLoading: false,
      };
    }

    case MEMBER_ORGS_ACTIONS.FETCH_PROFILE_MEMBER_ORGS_SUCCESS: {
      let { memberOrgs, userId, objective, mode } = action.payload;
      objective = getProfileObjectiveProp(objective);
      mode = getProfileModeProp(mode);
      return {
        ...state,
        error: null,
        profileMembers: {
          ...state.profileMembers,
          [userId]: {
            ...state.profileMembers[userId],
            [objective]: {
              ...state.profileMembers[userId]?.[objective],
              [mode]: memberOrgs,
            },
          },
        },
        isLoading: false,
      };
    }
    case MEMBER_ORGS_ACTIONS.UPDATE_PROFILE_MEMBER_ORG_SUCCESS: {
      let { memberOrg, userId } = action.payload;
      const isExpired = isPostExpired(memberOrg);
      const objective = getProfileObjectiveProp(memberOrg.objective);

      // map though all Profile Members to update
      let currentMembers = state.profileMembers[userId]?.[objective]?.all;
      currentMembers =
        currentMembers !== undefined
          ? currentMembers.map((currentMember) => {
            if (currentMember._id !== memberOrg._id) {
              return currentMember;
            }
            return {
              ...currentMember,
              ...memberOrg,
            };
          })
          : undefined;

      let currentActiveMembers = state.profileMembers[userId]?.[objective]?.active;
      let currentInActiveMembers =
        state.profileMembers[userId]?.[objective]?.inactive;

      if (!isExpired) {
        // map through active Profile memberOrgs to update
        currentActiveMembers =
          currentActiveMembers !== undefined
            ? currentActiveMembers.map((currentActiveMember) => {
              if (currentActiveMember._id !== memberOrg._id) {
                return currentActiveMember;
              }
              return {
                ...currentActiveMember,
                ...memberOrg,
              };
            })
            : undefined;
      } else {
        // map though achived Profile memberOrgs to update
        currentInActiveMembers =
          currentInActiveMembers !== undefined
            ? currentInActiveMembers.map((currentInActiveMember) => {
              if (currentInActiveMember._id !== memberOrg._id) {
                return currentInActiveMember;
              }
              return {
                ...currentInActiveMember,
                ...memberOrg,
              };
            })
            : undefined;
      }
      return {
        ...state,
        error: null,
        profileMembers: {
          ...state.profileMembers,
          [userId]: {
            ...state.profileMembers[userId],
            [objective]: {
              active: currentActiveMembers,
              inactive: currentInActiveMembers,
              all: currentMembers,
            },
          },
        },
      };
    }
    case MEMBER_ORGS_ACTIONS.FETCH_MEMBER_ORGS_ERROR: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        memberOrgs: [],
        isLoading: false,
      };
    }
    case MEMBER_ORGS_ACTIONS.NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case MEMBER_ORGS_ACTIONS.SET_PAGE:
      const { payload } = action;
      return { ...state, page: payload.page };
    case MEMBER_ORGS_ACTIONS.RESET_PAGE: {
      const { payload } = action;
      return {
        ...state,
        page: 0,
        memberOrgs: [],
        loadMore: payload.loadMore,
        isLoading: payload.isLoading,
      };
    }
    case MEMBER_ORGS_ACTIONS.FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
        loadMore: false,
      };
    case MEMBER_ORGS_ACTIONS.SET_REPORTED: {
      const { payload } = action;
      return {
        ...state,
        memberOrgs: {
          ...state.memberOrgs,
          [payload.memberOrgId]: {
            ...state.memberOrgs[payload.memberOrgId],
            didReport: true,
          },
        },
      };
    }
    case MEMBER_ORGS_ACTIONS.SHOW_ANYWAY: {
      const { payload } = action;
      return {
        ...state,
        memberOrgs: {
          ...state.memberOrgs,
          [payload.memberOrgId]: {
            ...state.memberOrgs[payload.memberOrgId],
            reportsCount: 0,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default memberOrgsReducer;
