import { APPLICANTS_ACTIONS } from "./actions";
import { isPostExpired } from "components/Feed/utils";

//TODO remove expired
const initialState = {
  applicants: [],
  pageApplicants: 0,
  error: null,
  isLoadingApplicants: false,
  loadMoreApplicants: true,
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

const applicantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICANTS_ACTIONS.RESET_APPLICANTS:
      return {
        state
      };
    case APPLICANTS_ACTIONS.FETCH_APPLICANTS_BEGIN:
      return {
        ...state,
        isLoadingApplicants: true,
      };
    case APPLICANTS_ACTIONS.FETCH_APPLICANTS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: null,
        applicants: payload,
        isLoadingApplicants: false,
      };
    }

    case APPLICANTS_ACTIONS.FETCH_PROFILE_APPLICANTS_SUCCESS: {
      let { applicants, userId, objective, mode } = action.payload;
      objective = getProfileObjectiveProp(objective);
      mode = getProfileModeProp(mode);
      return {
        ...state,
        error: null,
        profileApplicants: {
          ...state.profileApplicants,
          [userId]: {
            ...state.profileApplicants[userId],
            [objective]: {
              ...state.profileApplicants[userId]?.[objective],
              [mode]: applicants,
            },
          },
        },
        isLoadingApplicants: false,
      };
    }
    case APPLICANTS_ACTIONS.UPDATE_PROFILE_APPLICANT_SUCCESS: {
      let { applicant, userId } = action.payload;
      const isExpired = isPostExpired(applicant);
      const objective = getProfileObjectiveProp(applicant.objective);

      // map though all Profile Applicants to update
      let currentApplicants = state.profileApplicants[userId]?.[objective]?.all;
      currentApplicants =
        currentApplicants !== undefined
          ? currentApplicants.map((currentApplicant) => {
            if (currentApplicant._id !== applicant._id) {
              return currentApplicant;
            }
            return {
              ...currentApplicant,
              ...applicant,
            };
          })
          : undefined;

      let currentActiveApplicants = state.profileApplicants[userId]?.[objective]?.active;
      let currentInActiveApplicants =
        state.profileApplicants[userId]?.[objective]?.inactive;

      if (!isExpired) {
        // map through active Profile applicants to update
        currentActiveApplicants =
          currentActiveApplicants !== undefined
            ? currentActiveApplicants.map((currentActiveApplicant) => {
              if (currentActiveApplicant._id !== applicant._id) {
                return currentActiveApplicant;
              }
              return {
                ...currentActiveApplicant,
                ...applicant,
              };
            })
            : undefined;
      } else {
        // map though achived Profile applicants to update
        currentInActiveApplicants =
          currentInActiveApplicants !== undefined
            ? currentInActiveApplicants.map((currentInActiveApplicant) => {
              if (currentInActiveApplicant._id !== applicant._id) {
                return currentInActiveApplicant;
              }
              return {
                ...currentInActiveApplicant,
                ...applicant,
              };
            })
            : undefined;
      }
      return {
        ...state,
        error: null,
        profileApplicants: {
          ...state.profileApplicants,
          [userId]: {
            ...state.profileApplicants[userId],
            [objective]: {
              active: currentActiveApplicants,
              inactive: currentInActiveApplicants,
              all: currentApplicants,
            },
          },
        },
      };
    }
    case APPLICANTS_ACTIONS.FETCH_APPLICANTS_ERROR: {
      console.log("applicants error!!!")
      const { payload } = action;
      return {
        ...state,
        error: payload,
        applicants: [],
        isLoadingApplicants: false,
      };
    }
    case APPLICANTS_ACTIONS.NEXT_PAGE_APPLICANTS: {
      console.log("next pageApplicants appplicants!!!")
      return { ...state, pageApplicants: state.pageApplicants + 1 };
    }

    case APPLICANTS_ACTIONS.SET_PAGE:
      const { payload } = action;
      return { ...state, pageApplicants: payload.pageApplicants };
    case APPLICANTS_ACTIONS.RESET_PAGE_APPLICANTS: {
      console.log("applicants resetPageAction!!!")
      const { payload } = action;
      return {
        ...state,
        pageApplicants: 0,
        applicants: [],
        loadMoreApplicants: payload.loadMoreApplicants,
        isLoadingApplicants: payload.isLoadingApplicants,
      };
    }
    case APPLICANTS_ACTIONS.FINISH_LOADING:
      return {
        ...state,
        isLoadingApplicants: false,
        loadMoreApplicants: false,
      };
    case APPLICANTS_ACTIONS.SET_REPORTED: {
      const { payload } = action;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          [payload.applicantId]: {
            ...state.applicants[payload.applicantId],
            didReport: true,
          },
        },
      };
    }
    case APPLICANTS_ACTIONS.SHOW_ANYWAY: {
      const { payload } = action;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          [payload.applicantId]: {
            ...state.applicants[payload.applicantId],
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
