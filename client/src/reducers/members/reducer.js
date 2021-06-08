import { MEMBERS_ACTIONS } from "./actions";
import { isPostExpired } from "components/Feed/utils";

//TODO remove expired
const initialState = {
  members: [],
  pageMembers: 0,
  error: null,
  isLoadingMembers: false,
  loadMoreMembers: true,
  isCachedStale: false,
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

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERS_ACTIONS.FETCH_MEMBERS_BEGIN:
      return {
        ...state,
        isLoadingMembers: true,
      };
    case MEMBERS_ACTIONS.FETCH_MEMBERS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        members: payload,
        isLoadingMembers: false,
      };
    }

    case MEMBERS_ACTIONS.FETCH_PROFILE_MEMBERS_SUCCESS: {
      let { members, userId, objective, mode } = action.payload;
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
              [mode]: members,
            },
          },
        },
        isLoadingMembers: false,
      };
    }
    case MEMBERS_ACTIONS.UPDATE_PROFILE_MEMBER_SUCCESS: {
      let { member, userId } = action.payload;
      const isExpired = isPostExpired(member);
      const objective = getProfileObjectiveProp(member.objective);

      // map though all Profile Members to update
      let currentMembers = state.profileMembers[userId]?.[objective]?.all;
      currentMembers =
        currentMembers !== undefined
          ? currentMembers.map((currentMember) => {
            if (currentMember._id !== member._id) {
              return currentMember;
            }
            return {
              ...currentMember,
              ...member,
            };
          })
          : undefined;

      let currentActiveMembers = state.profileMembers[userId]?.[objective]?.active;
      let currentInActiveMembers =
        state.profileMembers[userId]?.[objective]?.inactive;

      if (!isExpired) {
        // map through active Profile members to update
        currentActiveMembers =
          currentActiveMembers !== undefined
            ? currentActiveMembers.map((currentActiveMember) => {
              if (currentActiveMember._id !== member._id) {
                return currentActiveMember;
              }
              return {
                ...currentActiveMember,
                ...member,
              };
            })
            : undefined;
      } else {
        // map though achived Profile members to update
        currentInActiveMembers =
          currentInActiveMembers !== undefined
            ? currentInActiveMembers.map((currentInActiveMember) => {
              if (currentInActiveMember._id !== member._id) {
                return currentInActiveMember;
              }
              return {
                ...currentInActiveMember,
                ...member,
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
    case MEMBERS_ACTIONS.FETCH_MEMBERS_ERROR: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        members: [],
        isLoadingMembers: false,
      };
    }
    case MEMBERS_ACTIONS.NEXT_PAGE_MEMBERS:
      return { ...state, pageMembers: state.pageMembers + 1 };
    case MEMBERS_ACTIONS.SET_PAGE_MEMBERS:
      const { payload } = action;
      return { ...state, pageMembers: payload.pageMembers };
    case MEMBERS_ACTIONS.RESET_PAGE_MEMBERS: {
      const { payload } = action;
      return {
        ...state,
        pageMembers: 0,
        members: [],
        loadMoreMembers: payload.loadMoreMembers,
        isLoadingMembers: payload.isLoadingMembers,
      };
    }
    case MEMBERS_ACTIONS.FINISH_LOADING_MEMBERS:
      return {
        ...state,
        isLoadingMembers: false,
        loadMoreMembers: false,
      };
    case MEMBERS_ACTIONS.SET_REPORTED: {
      const { payload } = action;
      return {
        ...state,
        members: {
          ...state.members,
          [payload.applicantId]: {
            ...state.members[payload.applicantId],
            didReport: true,
          },
        },
      };
    }
    case MEMBERS_ACTIONS.SHOW_ANYWAY: {
      const { payload } = action;
      return {
        ...state,
        members: {
          ...state.members,
          [payload.applicantId]: {
            ...state.members[payload.applicantId],
            reportsCount: 0,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default membersReducer;
